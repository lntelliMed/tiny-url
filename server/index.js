const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');
const PORT = process.env.PORT || 8080;
const app = express();

const { Url } = require('./db/models');


module.exports = app;

const createApp = () => {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', require('./api'));

  app.use(express.static(path.join(__dirname, '..', 'public')));



  app.get('/:shortUrl', (req, res, next) => {
    const shortUrl = req.params.shortUrl;
    Url.findOne({ where: { shortUrl } })
      .then(url => {
        if (url) {
          res.status(302).redirect(url.longUrl);
          // res.status(200).json({ longUrl: url.longUrl });
        } else {
          res.status(302).redirect('/');
        }
      })
      .catch(next);
  });

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
}

const startListening = () => {
  const server = app.listen(PORT, () => console.log(`Starting server on port ${PORT}`));
};


db.sync()
    .then(createApp)
    .then(startListening);
