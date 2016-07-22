var socket = require('socket.io-client')();

module.exports = socket;

// let hours = n => 1000*60*60*n;
// let days = n => hours(n) * 24;
// let cl = console.log.bind(console);

//socket.on('sending all tasks', cl);
//
// module.exports = function(action) {
//
//   if (action === 'sending all tasks') {
//     socket.on(action, cl);
//   }
//
//   if (action === 'get all tasks') {
//     socket.on(action);
//     var answer = socket.emit(action);
//     console.log(answer);
//   }
//
//   if (action === 'create task') {
//     socket.emit(action, {
//       id: 1,
//       name: 'walk the dogs',
//       dueBy: new Date(Date.now() + hours(2)),
//       interval: hours(8)
//     });
//   }
// };

// socket.on('create task', cl);
// socket.on('update task', cl);
// socket.on('archive task', cl);
// socket.on('unarchive task', cl);
// socket.on('complete task', cl);
// socket.emit('create task', {name: 'new task 1 yo'});
// socket.emit('update task', {id: 2, name: 'updated task, yo! whoop'})
// socket.emit('archive task', 1);
// socket.emit('unarchive task');
// socket.emit('complete task', 1);
