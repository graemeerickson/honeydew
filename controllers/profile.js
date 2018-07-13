const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const passport = require('../config/passportConfig');
const router = express.Router();

// include the user and recipe models
const db = require('../models');

var recipeId;

// GET route to get & display user's recipes
router.get('/', isLoggedIn, (req, res) => {
  db.User.findById(res.locals.currentUser, function(err, user) {
    if (err) return res.send(err);
    res.render('profile', {userRecipes: user.recipes});
  });
});

// POST route to capture clicked recipe ID, which will be used to show the recipe details on the View Recipe page
router.post('/viewRecipe', isLoggedIn, (req, res) => {
  recipeId = req.body.id;
  res.json(recipeId);
});

// GET route to show recipe details on the View Recipe page
router.get('/viewRecipe', isLoggedIn, (req, res) => {
  db.User.findById(res.locals.currentUser._id, function(err, user) {
    const userRecipe = user.recipes.filter( (recipe) => {
      return recipe._id == recipeId;
    })
    res.render('viewRecipe', {userRecipe: userRecipe});
  })
})

// allow other files to access the routes defined here
module.exports = router;