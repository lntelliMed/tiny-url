const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');
const PORT = process.env.PORT || 8080;
const app = express();

module.exports = app;

const createApp = () => {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', require('./api'));

  app.use(express.static(path.join(__dirname, '..', 'public')));

  // app.use((req, res, next) => {
  //   if (path.extname(req.path).length) {
  //     const err = new Error('Not found');
  //     err.status = 404;
  //     next(err);
  //   } else {
  //     next();
  //   }
  // });

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
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
