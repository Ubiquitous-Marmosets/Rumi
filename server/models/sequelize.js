var Sequelize = require('sequelize');

var db = new Sequelize('rumi', 'root', '', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = db;
