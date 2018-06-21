const router = require('express').Router();
const { Url } = require('../db/models');

module.exports = router;

const getFullShortUrl = (shortUrl, req) => {
  return req.protocol + '://' + req.headers.host + '/' + shortUrl
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
          shortUrl: getFullShortUrl(shortUrl, req)
        }
      });
      res.status(200).json(updatedUrls);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const longUrl = req.body.longUrl;
  Url.findOrCreate({ where: { longUrl } })
    .then(arr => {
      const instance = arr[0];
      const wasAdded = arr[1];
      if (wasAdded) {
        instance.shortUrl = instance.id;
        instance.save()
          .then(updatedInstance => {
            console.log(updatedInstance);
          })
          .catch(console.error);
      }
      res.status(200).json({
        id: instance.id,
        longUrl:  instance.longUrl,
        shortUrl: getFullShortUrl(instance.shortUrl, req),
        wasAdded
      });
    })
    .catch(next);
});
