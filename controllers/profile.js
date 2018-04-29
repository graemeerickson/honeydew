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

// POST route to capture clicked recipe ID, which will be used to show the recipe details on the Edit Recipe page
router.post('/editRecipe', isLoggedIn, (req, res) => {
  recipeId = req.body.id;
  res.json(recipeId);
});

// GET route to show appropriate recipe details on the Edit Recipe page
router.get('/editRecipe', isLoggedIn, (req, res) => {
  db.User.findById(res.locals.currentUser._id, function(err, user) {
    const userRecipe = user.recipes.filter( (recipe) => {
      return recipe._id == recipeId;
    })
    res.render('editRecipe', {userRecipe: userRecipe});
  })
})

// DELETE route to remove selected recipe from the db
router.delete('/editRecipe', isLoggedIn, (req, res) => {
  console.log('req.body:', req.body)
  recipeId = req.body.id;
  console.log('recipeId to remove:', recipeId);
  db.User.findById(res.locals.currentUser._id, function(err, user) {
    if (err) return res.send(err);
    user.recipes.filter( (recipe, index) => {
      if (recipe._id == recipeId) {
        console.log('in if statement');
        recipe.remove();
        user.save();
        res.send('Successfully deleted recipe');
      }
    })
  })
})

// allow other files to access the routes defined here
module.exports = router;