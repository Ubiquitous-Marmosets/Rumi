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
    verifyPassword: function(enteredPassword) { return enteredPassword === this.password; } //return (this.getDataValue('password') === enteredPassword); }
  }
});


//User.prototype.verifyPassword = enteredPassword => this.getDataValue('password') === enteredPassword;


db.sync({
}).then(() => {
  return User.create({
    name: 'trevdog',
    email: 'trevorwhealy@gmail.com',
    password: 'mypassissecret',
    admin: true,
  });
})
.catch((error) => {
  console.log(error);
});

var userObj = User.findOne({where: {'name': 'trevdog'}}).then(function(user){
  console.log(user.verifyPassword('mypassissecret'));
});