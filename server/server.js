let express = require('express');
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local');
let FacebookStrategy = require('passport-facebook').Strategy;

checkForEnvironmentVariables(['FB_ID', 'FB_SECRET', 'SESSION_SECRET']);

// for now, we just serialize the FB user id
// TODO ? : fix up for multiple auth strats
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});

// passport-local configurtion
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, done) {
    User.findOne({where: {email}}, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.verifyPassword(password)) {
        return done(null, false);
      }

      return done(null, user);
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
app.use(passport.initialize());
app.use(passport.session());

// routing

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
