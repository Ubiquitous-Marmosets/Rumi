var db = require('./sequelize.js');
var Sequelize = require('sequelize');

var Task = db.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dueBy: {
    type: Sequelize.DATE,
    allowNull: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isArchived: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
});

module.exports = Task;

