var db = require('./sequelize.js');
var Sequelize = require('sequelize');

var Household = db.define('household', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = Household;
