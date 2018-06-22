const router = require('express').Router();
const Hashids = require('hashids');
const { Url, db } = require('../db/models');


const formatShortUrl = (shortUrl, req) => {
  const urlPrefix = req.protocol + '://' + req.headers.host + '/';
  return shortUrl.includes(urlPrefix) ? shortUrl : urlPrefix + shortUrl;
};

const removeUrlPrefix = (url, req) => {
  const urlPrefix = req.protocol + '://' + req.headers.host + '/';
  return url.replace(urlPrefix, '');
};

router.get('/', (req, res, next) => {
  Url.findAll({
    attributes: ['id', 'longUrl', 'shortUrl']
  })
    .then(urls => {
      const updatedUrls = urls.map(url => {
        const {id, longUrl, shortUrl} = url;
        return {
          id,
          longUrl,
          shortUrl: formatShortUrl(shortUrl, req)
        }
      });
      res.status(200).json(updatedUrls);
    })
    .catch(next);
});

router.get('/:urlId', (req, res, next) => {
  const urlId = req.params.urlId;
  Url.findOne({ where: { id: urlId } })
    .then(url => {
      if (url) {
        res.status(200).json({
          id: url.id,
          longUrl: url.longUrl,
          shortUrl: formatShortUrl(url.shortUrl, req)
        });
      } else {
        res.status(404).json({
          error: 'Not found'
        });
      }
    })
    .catch(next);
});

router.delete('/:urlId', (req, res, next) => {
  const urlId = req.params.urlId;
  Url.destroy({ where: { id: urlId } })
    .then(numAffectedRows => {
      res.status(200).json({
        deletedRows: numAffectedRows
      });
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const longUrl = req.body.longUrl;
  Url.findOrCreate({ where: { longUrl } })
    .then(arr => {
      const instance = arr[0];
      const wasAdded = arr[1];
      const responseObj = {
        id: instance.id,
        longUrl: instance.longUrl,
        shortUrl: instance.shortUrl,
        wasAdded
      };

      if (!wasAdded) {
        responseObj.shortUrl = formatShortUrl(instance.shortUrl, req);
        res.status(200).json(responseObj);
      } else {
        const hashids = new Hashids();
        instance.shortUrl = hashids.encode(instance.id);
        instance.save()
          .then(updatedInstance => {
            responseObj.shortUrl = formatShortUrl(updatedInstance.shortUrl, req);
            res.status(201).json(responseObj);
          })
      }
    })
    .catch(next);
});

router.put('/:urlId', (req, res, next) => {
  const urlId = req.params.urlId;
  const {longUrl, shortUrl} = req.body;

  Url.findAll({
    where: {
      [db.Op.or]: [{ longUrl }, { shortUrl: removeUrlPrefix(shortUrl, req) }]
    }
  })
  .then(urls => {
    if (urls && urls.length >= 1) {
      for (let url of urls) {
        if (url.id !== parseInt(urlId)) {
          res.status(405).json({
            error: 'Another matching record exists with same field value(s)'
          });
        }
      }
    }
  })
  .catch(next);

  Url.update({
      longUrl,
      shortUrl
    }, {
        where: { id: urlId },
        returning: true,
        plain: true
      })
  .spread((numberOfAffectedRows, affectedRows) => {
    res.status(200).json({
      numberOfAffectedRows,
      affectedRows
    });
  })
  .catch(next);
});

module.exports = router;

