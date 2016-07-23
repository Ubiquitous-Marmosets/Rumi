let server = require('./server');
let db = require('./models/config');

db.sync().then(() => {
  server.listen(3000, () => {
    console.log('Listening on port 3000');
  });
});
