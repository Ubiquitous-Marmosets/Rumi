var db = require('./sequelize.js');
var Sequelize = require('sequelize');

// console.log(db);

var User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

db.sync({
}).then(() => {
  return User.create({
    email: 'trevorwhealy@gmail.com',
    password: 'mypassissecret'
  });
})
.catch((error) => {
  console.log(error);
});
