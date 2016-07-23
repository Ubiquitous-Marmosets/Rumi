var Household = require('./Household');
var Completed = require('./Completed');
var User = require('./User');
var Task = require('./Task');
var db = require('./sequelize');

Household.hasMany(User);
User.belongsTo(Household);

Task.hasMany(Completed);
User.hasMany(Completed);

Completed.belongsTo(User);
Completed.belongsTo(Task);

module.exports = db;
