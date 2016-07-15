var db = require('./sequelize.js');
var Sequelize = require('sequelize');

var Completed = db.define('completed', {});

Completed.hasOne(User);
Completed.hasOne(Task);
