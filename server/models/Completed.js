var db = require('./sequelize.js');

var Completed = db.define('completed', {});

module.exports = Completed;
