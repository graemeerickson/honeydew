const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const passport = require('../config/passportConfig');
const router = express.Router();

// include the user and recipe models
const User = require('../models');
const db = require('../models');

// get all of the user's recipes
router.get('/', isLoggedIn, (req, res) => {
  // find user's recipe list
  const userRecipes = db.Recipe.find()
  res.json(userRecipes);
})

// create a new recipe belonging to the user
router.post('/', isLoggedIn, (req, res) => {
  // create user recipe
  // db.User.find()
  // res.json(userRecipes);
})

// allow other files to access the routes defined here
module.exports = router;