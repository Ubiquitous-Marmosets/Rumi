let express = require('express');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;

let User = require('./models/User');
let OAuth = require('./models/OAuth');

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
  User.findByEmail(email).then(user => {
    if (!user) {
      console.error('user does not exist in the database');
      done(null, false);
    } else {
      user.verifyPassword(password).then(verified => {
        if (verified) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }
  });
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: '/auth/facebook/return'
}, function(accessToken, refreshToken, profile, done) {
    // what if user exists in user table
    // but first time logging in with fb?
    // current logic would create a duplicate user in user table
    OAuth.findOne({where: {
      oauthId: profile.id,
      oauthType: 'facebook'
    }})
    .then(oauth => {
      if (!oauth) {
        User.create({
          name: profile.displayName,
          email: 'na',   // ???
          password: 'na' // ???
        })
        .then((user) => {
          OAuth.create({
            oauthId: profile.id,
            oauthType: profile.provider,
            userId: user.id
          });
          done(null, user);
        });
      } else {
        User.findOne({where: {
          id: oauth.userId
        }})
        .then(user => {
          done(null, user);
        });
      }
    });
}));

let routes = express.Router();

routes.post('/auth/local',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login.html'
  })
);

routes.post('/auth/local/register', (req, res) => {
  User.findByEmail(req.body.email).then(user => {
    if (user) {
      res.redirect('/register.html?error');
    } else {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user => {
        res.redirect('/login.html?success');
      });
    }
  });
});

routes.get('/auth/facebook', passport.authenticate('facebook'));

routes.get('/auth/facebook/return',
  passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login.html'
  })
);

routes.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html');
  });
});

function isAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login.html');
  }
}

module.exports = {
  passport,
  routes,
  isAuth
};
