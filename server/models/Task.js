var db = require('./sequelize');
var Sequelize = require('sequelize');
var Completed = require('./completed');

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
    complete: function() {
      return Completed.create({}).then(completed => {
        this.dueBy = new Date(this.dueBy).getTime() + this.interval;
        this.addCompleted(completed);
        return this.save();
      });
    }
  }
});

module.exports = Task;
