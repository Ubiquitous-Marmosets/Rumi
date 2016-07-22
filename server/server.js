let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let bcrypt = require('bcrypt-nodejs');
let passport = require('passport');
let LocalStrategy = require('passport-local');
let FacebookStrategy = require('passport-facebook').Strategy;
let User = require('./models/User');
let decorate = require('./alphadeltaninerniner.service');

checkForEnvironmentVariables(['FB_ID', 'FB_SECRET', 'SESSION_SECRET']);

// for now, we just serialize the FB user id
// TODO ? : fix up for multiple auth strats
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});

// passport-local configuration
// Sign Up: Create a new user if an email doesnt already exist in the database
passport.use(new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
  User.findOrCreate({where: {email}, defaults: {password: password}})
    .spread((user, created) => {
      if (!created) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
}));

// passport-facebook configuration
passport.use(new FacebookStrategy({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: '/auth/facebook/return'
}, function(accessToken, refreshToken, profile, done) {
  done(null, profile);
}));

// middleware configuration
let app = express();
app.use(express.static(__dirname + '/../public'));
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
let server = decorate(app);

// create user, hash password, and store in db
// Sign In:
app.post('/auth/local', (req, res) => {

  User.findOne({where: {email: req.body.email}})
    .then((user) => {
      if (!user) {
        console.error('user does not exist in the database.');
        res.redirect('/signup');
      } else {
        // if there is a user with that email, now we have to verify the password
        if (User.verifyPassword(req.body.password, user)) {
          console.log('successful sign in');
          res.redirect('/');
        } else { // if the password failed
          console.error('the password you entered does not match');
          res.redirect('/login');
        }
      }
    });
});

app.post ('/auth/local/signup', (req, res) => {
  User.findOne({where: {email: req.body.email}})
  .then(user => {
    if (user) {
      console.err('Account already exits for entered email.');
      res.end();
    } else {
      User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });
      //TODO: Create Session and login, redirect appropriately
      res.end();
    }
  });
});
app.post('/auth/local',
  passport.authenticate('local', {
    failureRedirect: '/login'
  }), function(req, res) {
    res.redirect('/');
  }
);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/return',
  passport.authenticate('facebook',
    { successRedirect: '/', //user find or create goes here on success
      failureRedirect: '/login' }));

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// exports

module.exports = server;

// helper functions

function isAuth(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

function checkForEnvironmentVariables(arr) {
  arr.forEach(v => {
    if (!process.env[v]) {
      throw new Error(`environment variable ${v} not defined`);
    }
  });
};
