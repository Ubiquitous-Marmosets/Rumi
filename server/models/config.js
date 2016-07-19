var Household = require('./Household');
var Completed = require('./Completed');
var User = require('./User');
var Task = require('./Task');
var db = require('./sequelize');

User.belongsTo(Household); // will add household id to user

Household.hasMany(User);

Task.hasMany(Completed);
User.hasMany(Completed);

Completed.belongsTo(User);
Completed.belongsTo(Task); //left is source and right is target


/*
  
  db.sync({}) // all commands follow db.sync

  Create a user:

  Create a household:

  Add a user to household:

  .then(() => {
    return Household.findOne({where: {name: 'Rumi'}});
  })
  .then((household) => {
    User.findOne({where: {name: 'newUser9'}}); //either find a user and add them to a household, or add them to a household on create
    return User.create({
      name: 'newuser9',
      email: 'newuser@gmail.com',
      password: 'mypassissecret',
      admin: true
    }).then((user) => {
      household.addUser(user);
      console.log(household);
    });
  })

  Create a task:

  .then(() => {
    return Task.create({
      name: "Walk Dogs3",
      date: new Date(),
      image: ''
    });
  })

  Create a completed:

  .then((task) => {
    return Completed.create({})
    .then(completed => {
      task.addCompleted(completed);
    });
  })

 */