var db = require('./sequelize.js');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
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
    verifyPassword: enteredPassword => {
      bcrypt.compare(enteredPassword, this.password, (err, res) => {
        if (err) {
          return console.error(err);
        } else {
          // res will be true or false
          return res;
        }
      });
    }
  }
});

User.hook('beforeCreate', (user, options) => {
  bcrypt.hash(user.password, null, null, (err, hashedPassword) => {
    if (err) {
      console.error(err);
    } else {
      user.password = hashedPassword;
    }
  });
});

module.exports = User;
