var db = require('./sequelize.js');
var Sequelize = require('sequelize');
// var bcrypt = require('bcrypt');
// console.log(db);

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  instanceMethods: {
    verifyPassword: function(enteredPassword) { return enteredPassword === this.password; } //return (this.getDataValue('password') === enteredPassword); }
  }
});

module.exports = User;

//User.prototype.verifyPassword = enteredPassword => this.getDataValue('password') === enteredPassword;

