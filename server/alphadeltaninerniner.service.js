let http = require('http');
let socketIo = require('socket.io');
let Task = require('./models/Task');
let Completed = require('./models/Completed');
require('./models/config.js');

function decorate(app) {
  let server = http.Server(app);
  let io = socketIo(server);
  io.on('connection', socket => {
    console.log('connected');

    socket.on('create task', createTask);
    // socket.on('read task', readTask);
    socket.on('update task', updateTask);
    socket.on('archive task', archiveTask);
    socket.on('unarchive task', notYetImplemented.bind(null, 'unarchive task'));
    socket.on('complete task', completeTask);

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  });
  return server;

  function createTask(task) {
    return Task.create(task).then(task => {
      io.emit('create task', task);
    });
  }

  function updateTask(updatedTask) {
    return Task.findById(updatedTask.id).then(task => {
      return task.update(updatedTask);
    }).then(task => {
      io.emit('update task', task);
    });
  }

  function archiveTask(id) {
    return Task.findById(id).then(task => {
      return task.update({isArchived: true});
    }).then(task => {
      io.emit('archive task', id);
    });
  }

  function completeTask(taskId) {
    return Completed.create({}).then(completed => {
      Task.findById(taskId).then(task => {
        return task.addCompleted(completed);
      }).then(what => {
        io.emit('complete task', what);
      });
    })
  }

  function notYetImplemented(action) {
    console.warn(`${action} is not yet implemented!`);
  }
}

module.exports = decorate;
