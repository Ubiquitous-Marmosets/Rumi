var Sequelize = require('sequelize');

var db = new Sequelize('rumi', 'rumi', '', {
  host: 'localhost',
  dialect: 'postgres',
});

db.sync();

module.exports = db;
