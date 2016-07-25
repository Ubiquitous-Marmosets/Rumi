var db = require('./sequelize');
var Sequelize = require('sequelize');

var OAuth = db.define('oauth', {
  oauthId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  oauthType: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = OAuth;
