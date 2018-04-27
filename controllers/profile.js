const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const passport = require('../config/passportConfig');
const router = express.Router();

// include the user and recipe models
const db = require('../models');

var recipeId;

router.get('/', isLoggedIn, (req, res) => {
  db.User.findById(res.locals.currentUser, function(err, currentUser) {
    if (err) return res.send(err);
    res.render('profile', {userRecipes: currentUser.recipes});
  });
});

router.post('/editRecipe', isLoggedIn, (req, res) => {
  recipeId = req.body.id;
  res.json(recipeId);
});

router.get('/editRecipe', isLoggedIn, (req, res) => {
  db.User.findById(res.locals.currentUser._id, function(err, user) {
    const userRecipe = user.recipes.filter( (recipe) => {
      return recipe._id == recipeId;
    })
    res.render('editRecipe', {userRecipe: userRecipe});
  })
})

// allow other files to access the routes defined here
module.exports = router;