const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const passport = require('../config/passportConfig');
const router = express.Router();

// include the user model
const db = require('../models');

router.get('/', isLoggedIn, (req, res) => {
  db.User.findById(res.locals.currentUser, function(err, currentUser) {
    if (err) return res.send(err);
    // find only the recipes added to the user's mealplan
    let activeRecipes = currentUser.recipes.filter( (recipe) => {
      return recipe.activeCount > 0;
    });
    // throw recipe names into an object to de-duplicate
    let recipeSummaryObj = {};
    let activeRecipeNames = [];
    activeRecipes.forEach( recipe => {
      activeRecipeNames.push(recipe.recipeName);
    })
    activeRecipeNames.sort().forEach( (recipe, index) => {
      recipeSummaryObj[index] = recipe;
    })
    res.render('grocerylist', {userRecipes: activeRecipes, recipeSummary: recipeSummaryObj});
  });
});

module.exports = router;
