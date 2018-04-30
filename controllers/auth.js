const express = require('express');
const passport = require('../config/passportConfig');
const router = express.Router();
// include the user model
const User = require('../models/user');


// render the page with the login form
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// perform login functionality
router.post('/login', passport.authenticate('local', {
  // on success
  successRedirect: '/',
  // successFlash: 'Welcome!',
  // on failure
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid credentials'
}));

// render the page with the signup form
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

// perform signup functionality
router.post('/signup', (req, res, next) => {
  console.log("router.post('/signup')");
  console.log('req.body.email:', req.body.email);
  // check if error
  User.findOne({email: req.body.email}, function(err, user) {
    console.log('User.findOne');
    if (err) {
      console.log('if');
      console.log('signup error', err);
      // show error message to user (type = 'error')
      req.flash('error', 'Signup error');
      res.redirect('/auth/signup');
    }
    // check if user already exists
    else if (user) {
      console.log('else if')
      req.flash('error', 'Email address already exists');
      res.redirect('/auth/login');
    }
    else {
    // success case - create user and log them in
      console.log('else');
      User.create(req.body, function(err, createdUser) {
        if (err) {
          req.flash('error', 'Signup error');
          return console.log('err', err);
        }
        console.log("Signed up! Now let's log in");
        passport.authenticate('local', {
          successRedirect: '/',
          successFlash: 'Account created successfully - now start inputting your recipes!'
        })(req, res, next);
      })
    }
  })
});

// logout route removes user data from session, then redirects to the home page
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Successfully logged out');
  res.redirect('/');
})

// allow other files to access the routes defined here
module.exports = router;
