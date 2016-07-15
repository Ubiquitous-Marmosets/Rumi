var Sequelize = require('sequelize');

var db = new Sequelize('rumi', 'Dane', '', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = db;
