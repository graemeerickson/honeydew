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
  console.log(req.body.id);
  recipeId = req.body.id;
  res.json(recipeId);
});

// GET route to show appropriate recipe details on the View Recipe page
router.get('/viewRecipe', isLoggedIn, (req, res) => {
  db.User.findById(res.locals.currentUser._id, function(err, user) {
    const userRecipe = user.recipes.filter( (recipe) => {
      return recipe._id == recipeId;
    })
    console.log('userRecipe:', userRecipe);
    res.render('viewRecipe', {userRecipe: userRecipe});
  })
})

// DELETE route to remove selected recipe from the db
router.delete('/viewRecipe', isLoggedIn, (req, res) => {
  recipeId = req.body.id;
  db.User.findById(res.locals.currentUser._id, function(err, user) {
    if (err) return res.send(err);
    user.recipes.filter( (recipe, index) => {
      if (recipe._id == recipeId) {
        recipe.remove();
        user.save();
        res.send('Successfully deleted recipe');
      }
    })
  })
})

// PUT route to updated selected recipe in the db
router.put('/viewRecipe', isLoggedIn, (req, res) => {
  console.log('req.body:', req.body)
  recipeId = req.body.id;
  console.log('recipeId to update:', recipeId);
  // db.User.findById(res.locals.currentUser._id, function(err, user) {
  //   if (err) return res.send(err);
  //   user.findByIdAndUpdate(
  //     {recipes.id: req.body.id},
  //     {

  //     }, function(err, cb) {
  //       if (err) res.send(err);
        res.send('Successfully updated recipe');
  //     }
  //   });
  // });
});

// allow other files to access the routes defined here
module.exports = router;