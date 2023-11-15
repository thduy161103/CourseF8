const passport = require('passport');
const User = require('../app/models/User');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// local sign-up
passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, username, password, done) {
  User.findOne({ 'username': username })
  .then( (err, user) => {
    if (err) { return done(err); }
    if (user) {
      return done(null, false, { message: 'Username is already in use.' })
    }
    var newUser = new User();
    newUser.username = username;
    newUser.email = req.body.email;
    newUser.password = newUser.encryptPassword(password);

    newUser.save(function (err, result) {
      if (err) {
        return done(err);
      }
      return done(null, newUser);
    });
  });
}));

// local sign-in
passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, username, password, done) {
  User.findOne({ 'username': username })
  .then((err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Not user found' })
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Wrong password' });
    }
    return done(null, user);
  });
}));
