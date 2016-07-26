let http = require('http');
let socketIo = require('socket.io');
let Task = require('./models/Task');
let User = require('./models/User');
let Completed = require('./models/Completed');

// Socket is the one in particular who is sending us stuff
// IO.emit is sending to everyone

/**
 * Decorates an express application with our
 * alpha delta niner niner super duper web sockets service.
 * @param  {ExpressApp} app An express web app (e.g. let app = express())
 * @return {HttpServer}     An http server with alphadeltaninerniner superpowers
 */
function decorate(app, session) {
  let server = http.Server(app);
  let io = socketIo(server);
  io.use((socket, next) => {
    session(socket.request, socket.request.res, next);
  });
  io.on('connection', socket => {
    if (!socket.request.session.passport) {
      return socket.emit('rumi error', {message: 'Please reauthenticate'});
    }
    console.log('connected');

    socket.on('create task', createTask);
    // socket.on('read task', readTask);
    socket.on('update task', updateTask);
    socket.on('archive task', archiveTask);
    socket.on('unarchive task', notYetImplemented.bind(null, 'unarchive task'));
    socket.on('complete task', completeTask(socket.request.session.passport.user));

    socket.on('get all tasks', getAllTasks(socket));
    socket.on('get completeds', getCompleteds(socket));

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  });
  return server;

  /**
   * Creates a new Task in the database and
   * broadcasts it to all connected clients.
   * @param  {object} task A task object
   */
  function createTask(task) {
    // Verify user permissions
    return Task.create(task).then(task => {
      io.emit('create task', task);
    });
  }

  /**
   * Updates the provided Task in the database
   * and broadcasts it to all connected clients
   * @param  {object} updatedTask A task object
   */
  function updateTask(updatedTask) {
    return Task.findById(updatedTask.id).then(task => {
      return task.update(updatedTask);
    }).then(task => {
      io.emit('update task', task);
    });
  }

  /**
   * Archives the Task associated with the id
   * and broadcasts it to all connected clients
   * @param  {object} id ID of a Task
   */
  function archiveTask(id) {
    return Task.findById(id).then(task => {
      return task.update({isArchived: true});
    }).then(task => {
      io.emit('archive task', id);
    });
  }

  /**
   * Completes a Task and broadcasts it all
   * connected clients
   * @param  {object} id ID of a Task
   */
  function completeTask(userId) {
    return id => {
      return Task.findById(id).then(task => task.complete(userId)).then(completed => {
        completed.reload({ include: [ User, Task ] }).then(completed => {
          io.emit('complete task', completed);
        });
      });
    };
  }

  function getAllTasks(socket) {
    return () => {
      return Task.findAll().then(tasks => {
        socket.emit('sending all tasks', tasks);
      });
    };
  }

  function getCompleteds(socket) {
    return () => {
      return Completed.findAll({
        order: [['id', 'DESC']],
        limit: 20,
        include: [ Task, User ]
      }).then(completeds => {
        socket.emit('sending completeds', completeds);
      });
    }
  }

  /**
   * Logs that the given action is not yet implemented.
   * @param  {string} action String representing an action
   */
  function notYetImplemented(action) {
    console.warn(`[WARN] ${action} is not yet implemented!`);
  }
}

module.exports = decorate;
