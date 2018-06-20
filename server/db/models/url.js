const Hashids = require('hashids');
const Sequelize = require('sequelize');
const db = require('../db');

const Url = db.define('url', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  longUrl: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  shortUrl: {
    type: Sequelize.STRING,
    set(valueToBeSet) {
      const hashids = new Hashids();
      this.setDataValue('shortUrl', hashids.encode(valueToBeSet));
    }
  }
});

module.exports = Url;
