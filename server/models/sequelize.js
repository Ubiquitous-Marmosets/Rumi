var Sequelize = require('sequelize');

var db = new Sequelize('rumi', 'work', '', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = db;
