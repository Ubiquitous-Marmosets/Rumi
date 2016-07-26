let server = require('./server');
let db = require('./models/config');

db.sync().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    
    console.log('Listening....');
  });
});
