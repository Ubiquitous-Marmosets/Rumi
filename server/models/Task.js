var db = require('./sequelize');
var Sequelize = require('sequelize');
var Completed = require('./Completed');
var User = require('./User');

var Task = db.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dueBy: {
    type: Sequelize.DATE,
    allowNull: true
  },
  interval: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isArchived: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
}, {
  instanceMethods: {
    complete: function(userId) {
      this.dueBy = Date.now() + this.interval;
      return Completed.create().then(completed => {
        return this.save()
        .then(task => User.findById(userId))
        .then(user => completed.setUser(user))
        .then(completed => completed.setTask(this));
      });
    }
  }
});

module.exports = Task;
