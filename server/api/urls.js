const router = require('express').Router();
const Hashids = require('hashids');
const { Url } = require('../db/models');


const formatShortUrl = (shortUrl, req) => {
  return req.protocol + '://' + req.headers.host + '/' + shortUrl;
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
    }
    )
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
        shortUrl: instance.shortUrl
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

module.exports = router;

