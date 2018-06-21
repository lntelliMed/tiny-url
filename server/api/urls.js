const router = require('express').Router();
const { Url } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Url.findAll({
    attributes: ['id', 'longUrl', 'shortUrl']
  })
    .then(urls => res.json(urls))
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
        longUrl: instance.longUrl,
        shortUrl: instance.shortUrl,
        wasAdded
      });
    })
    .catch(next);
});
