const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const passport = require('../config/passportConfig');
const router = express.Router();

// include the user and recipe models
const User = require('../models/user');

router.get('/', isLoggedIn, (req, res) => {
  res.render('profile');
});

// allow other files to access the routes defined here
module.exports = router;