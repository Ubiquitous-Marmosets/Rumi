let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');

let decorate = require('./alphadeltaninerniner.service');
let auth = require('./auth');

checkForEnvironmentVariables(['FB_ID', 'FB_SECRET', 'SESSION_SECRET']);

let sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
});
// middleware configuration
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessionMiddleware);
app.use(auth.passport.initialize());
app.use(auth.passport.session());
app.use(auth.routes);
app.use(express.static(__dirname + '/../public'));
app.use(auth.isAuth, express.static(__dirname + '/../dist'));
let server = decorate(app, sessionMiddleware);

module.exports = server;

function checkForEnvironmentVariables(arr) {
  arr.forEach(v => {
    if (!process.env[v]) {
      throw new Error(`environment variable ${v} not defined`);
    }
  });
};
