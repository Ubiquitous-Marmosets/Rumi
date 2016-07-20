let http = require('http');
let socketIo = require('socket.io');
let Task = require('./models/Task');

function decorate(app) {
  let server = http.Server(app);
  let io = socketIo(server);
  io.on('connection', socket => {
    console.log('connected');

    socket.on('create task', createTask);
    // socket.on('read task', readTask);
    socket.on('update task', updateTask);
    socket.on('delete task', deleteTask);

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

  function deleteTask(id) {
    return Task.destroy({
      where: {id}
    }).then(_ => {
      io.emit('delete task', id);
    });
  }
}

module.exports = decorate;
