var Household = require('./Household');
var Completed = require('./Completed');
var User = require('./User');
var Task = require('./Task');
var OAuth = require('./OAuth');
var db = require('./sequelize');

Household.hasMany(User);
User.belongsTo(Household);

Task.hasMany(Completed);
User.hasMany(Completed);

Completed.belongsTo(User);
Completed.belongsTo(Task);

User.hasMany(OAuth);

module.exports = db;
