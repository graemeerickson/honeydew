const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const passport = require('../config/passportConfig');
const router = express.Router();

// include the user and recipe models
const db = require('../models');

// get all of the user's recipes
router.get('/', isLoggedIn, (req, res) => {
  // find user's recipe list
  const user = db.User.find({ _id: res.locals.currentUser}, function (err, user) {
    res.json(user);
  })
});

// create a new recipe belonging to the user
router.post('/', isLoggedIn, (req, res) => {
  // create new ingredients object
  console.log(req.body);
  // create new recipes object, incl ingredients
  // redirect to homepage

  // db.User.find()
  // res.json(userRecipes);
  console.log('got to recipes POST backend route');
  res.send('got to recipes POST backend route');
  res.json()
})

// allow other files to access the routes defined here
module.exports = router;
