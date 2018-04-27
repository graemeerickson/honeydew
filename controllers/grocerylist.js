const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const passport = require('../config/passportConfig');
const router = express.Router();

// include the user and recipe models
const db = require('../models');

router.get('/', isLoggedIn, (req, res) => {
  db.User.findById(res.locals.currentUser, function(err, currentUser) {
    if (err) return res.send(err);
    res.render('grocerylist', {userRecipes: currentUser.recipes});
  });
});

module.exports = router;
