let hours = n => 1000*60*60*n;
let days = n => hours(n) * 24;


// When they put in a task they want it to occur every X days

// 

module.exports = {
  allTasks: [
    { // urgent
      id: 1,
      name: 'walk the dogs',
      dueBy: new Date(Date.now() + hours(2)),
      interval: hours(8)
    },
    { // urgent
      id: 2,
      name: 'clean the dishes',
      dueBy: new Date(Date.now() + hours(23)),
      interval: days(2)
    },
    {
      id: 3,
      name: 'take out trash',
      dueBy: new Date(Date.now() + days(4)),
      interval: days(7)
    },
    { // overdue
      id: 4,
      name: 'wash the car',
      dueBy: new Date(Date.now() - days(1)),
      interval: days(14)
    },
    {
      id: 5,
      name: 'pay bills',
      dueBy: new Date(Date.now() + days(25)),
      interval: days(31)
    }
  ],
  allCompletedTasks: [
    {
      userId: 1,
      taskId: 3
    },
    {
      userId: 1,
      taskId: 2
    },
    {
      userId: 2,
      taskId: 3
    },
    {
      userId: 1,
      taskId: 1
    },
    {
      userId: 1,
      taskId: 2
    }
  ]
};
