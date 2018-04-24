const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// tell passport how to store data in the session
// Serialization so we don't have to store entire user object in session.
passport.serializeUser(function(user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
  User.findById(id).then(function(user) {
    // success
    callback(null, user);
  })
  .catch(function(err) {
    // something went wrong
    callback(err, null);
  })
})

// implement login functionality
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, callback){
  // find the user, validate credentials, then callback
  User.findOne({email: email}, function(err, user){
    if(err || !user || !user.isAuthenticated(password)) {
      console.log('error', err);
      callback(err, null);
    }
    // no error and user is authenticated
    else {
      callback(null, user);
    }
  });
}));

module.exports = passport;
