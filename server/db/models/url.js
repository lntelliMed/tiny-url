const Sequelize = require('sequelize');
const db = require('../db');

const Url = db.define('url', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  longUrl: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [1, 2048],
        msg: 'Please provide valid URL within 1 to 2048 characters.'
      }
    }
  },
  shortUrl: {
    type: Sequelize.STRING
  }
});

module.exports = Url;
