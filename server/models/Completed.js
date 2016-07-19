var db = require('./sequelize.js');
var Sequelize = require('sequelize');
var User = require('./User');
var Task = require('./Task');

var Completed = db.define('completed', {});

module.exports = Completed;

