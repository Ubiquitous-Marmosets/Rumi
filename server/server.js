let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let bcrypt = require('bcrypt-nodejs');
let passport = require('passport');
let LocalStrategy = require('passport-local');
let FacebookStrategy = require('passport-facebook').Strategy;
let User = require('needToRequireModelFile');

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
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, done) {
    User.findOne({where: {email}})
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          // compare password to hashed password from db
          bcrypt.compare(password, user.password, (err, correctPassword) => {
            if (err) {
              return done(err);
            }

            if (!correctPassword) {
              return done(null, false);
            }

            return done(null, user);
          });
        });
  }
));

// passport-facebook configuration
passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: '/auth/facebook/return'
  }, function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

// middleware configuration

let app = express();
app.use(express.static(__dirname + '/../public'));
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

// routing

// create user, hash password, and store in db
app.post('createUserEndpoint', (req, res) => {
  User.findOne({where: {email: req.body.email}})
      .then((user) => {

        // user already exists
        if (user) {
          res.redirect('createUserEndpoint');
        } else {
          bcrypt.hash(req.body.password, null, null, (err, hashedPassword) => {
            if (err) {
              res.redirect('createUserEndpoint');
            } else {
              User.create({
                email: req.body.email,
                password: hashedPassword
              })
              .then(function() {
                res.redirect('/');
              });
            }
          });
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
    { successRedirect: '/',
      failureRedirect: '/login' }));

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// exports

module.exports = app;

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
}
