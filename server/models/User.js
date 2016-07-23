var db = require('./sequelize');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

var Promise = require('bluebird');

var pHash = Promise.promisify(bcrypt.hash);
var pCompare = Promise.promisify(bcrypt.compare);

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
    allowNull: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  instanceMethods: {
    verifyPassword: function(password) {
      return pCompare(password, this.password);
    }
  }
});

User.findByEmail = function(email) {
  return User.findOne({where: {email}});
}

// User.verifyPassword = function(enteredPassword, user) {
//   return pCompare(enteredPassword, user.password);
// };

User.beforeCreate((user, options) => {
  return pHash(user.password, null, null).then(hash => {
    user.password = hash;
    //user.set('password', hash); user.password = and user.set work the same
    //return user; // works without
  });
});

module.exports = User;
