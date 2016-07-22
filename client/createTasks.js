// Necessary for building out the database with the tasks on load.
module.exports = function(allData) {
  console.log('1234231413', allData);
  allData.forEach(task => {
    socket.emit('create task', task);
  });
};
