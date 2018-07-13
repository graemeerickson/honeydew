const cloudinary = require('cloudinary');
const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const multer = require('multer');    // for cloudinary
const passport = require('../config/passportConfig');
const router = express.Router();
const upload = multer({ dest: './uploads/' });  // for cloudinary

// include the user and recipe models
const db = require('../models');

// GET route to get all of the user's recipes
router.get('/', isLoggedIn, (req, res) => {
  // find user's recipe list
  const user = db.User.find({ _id: res.locals.currentUser}, function (err, user) {
    res.json(user);
  })
});

// POST route to create a new recipe
router.post('/', isLoggedIn, upload.single('my-file'), (req, res) => {
  let ingredientsArr = [];
  // if just one ingredient in recipe, convert ingredient strings to arrays
  if (typeof req.body['ingredient-item-input'] === 'string') {
    let ingredientItemArr = [];
    ingredientItemArr.push(req.body['ingredientItemInput']);
    let ingredientQtyArr = [];
    ingredientQtyArr.push(req.body['ingredientQtyInput']);
    let ingredientMeasuringUnitArr = [];
    ingredientMeasuringUnitArr.push(req.body['ingredientMeasuringUnitSelect']);

    // populate ingredient objects & push to a single consolidated ingredients array
    for (let i = 0; i < ingredientItemArr.length; i++) {
      let tmpIngredientObj = {};
      tmpIngredientObj.ingredientName = ingredientItemArr[i];
      tmpIngredientObj.qty = ingredientQtyArr[i];
      tmpIngredientObj.measuringUnit = ingredientMeasuringUnitArr[i];
      ingredientsArr.push(tmpIngredientObj);
    }
  }
  // multiple ingredients included, so no need to convert to array
  else {
    for (let i = 0; i < req.body['ingredient-item-input'].length; i++) {
      let tmpIngredientObj = {};
      tmpIngredientObj.ingredientName = req.body['ingredient-item-input'][i];
      tmpIngredientObj.qty = req.body['ingredient-qty-input'][i];
      tmpIngredientObj.measuringUnit = req.body['ingredient-measuring-unit-select'][i];
      ingredientsArr.push(tmpIngredientObj);
    }
  };

  if (req.file !== undefined) {
    // create new recipe object with Cloudinary image url, then insert into user record. redirect user to homepage.
    cloudinary.uploader.upload(req.file.path, function(result) {
      let newRecipe = new db.Recipe({ recipeName: req.body['recipe-name-input'], servingSize: req.body['serving-size-select'], ingredients: ingredientsArr, prepInstructions: req.body['prep-instructions-text-area'], prepTime: req.body['prep-time-input'], cookTime: req.body['cook-time-input'], mealType: req.body['meal-type-select'], imgUrl: result.url, activeCount: 0 })
      newRecipe.save();

      db.User.findByIdAndUpdate(
        res.locals.currentUser,
        {$push: {recipes: newRecipe}},
        { 'new': true },
        function (err, user) {
          if (err) { console.log('Error adding new recipe to user db record', err); };
          res.redirect('/');
        }
      );
    });
  } 
  // no image included, so bypass cloudinary
  else {
    let newRecipe = new db.Recipe({ recipeName: req.body['recipe-name-input'], servingSize: req.body['serving-size-select'], ingredients: ingredientsArr, prepInstructions: req.body['prep-instructions-text-area'], prepTime: req.body['prep-time-input'], cookTime: req.body['cook-time-input'], mealType: req.body['meal-type-select'], imgUrl: 'https://res.cloudinary.com/graemeerickson/image/upload/v1527094309/recipe-placeholder-image.png', activeCount: 0 })
      newRecipe.save();

    db.User.findByIdAndUpdate(
      res.locals.currentUser,
      {$push: {recipes: newRecipe}},
      { 'new': true },
      function (err, user) {
        if (err) { console.log('Error adding new recipe to user db record', err); };
        res.redirect('/');
      }
    );
  }
})

// PUT route to update user's recipe & mealplan
router.put('/', isLoggedIn, (req,res) => {
  let scenario = req.body.scenario;

  // scenario: no new recipe is selected, and mealplan slot is not blank - UPDATE PREVIOUS RECIPE AND CLEAR MEAL PLAN SLOT
  switch (scenario) {
    case 'clear-mealplan-slot':
      db.User.findById(res.locals.currentUser.id, function(err, user) {
        if (err) { console.log("Error finding user in db", err); };
        // decrement cleared recipe's active count
        for (let i = 0; i < user.recipes.length; i++) {
          if (user.recipes[i].recipeName === req.body['selected-meal-plan-slot-existing-recipe']) {
            user.recipes[i].activeCount > 0 ? user.recipes[i].activeCount -= 1 : user.recipes[i].activeCount = 0;
          }
        }
        // update mealplan slot to a blank value
        user.mealPlan.splice(req.body['selected-meal-plan-slot-id'],1,"");
        user.save();
        res.render('home');
      })
      break;
    // scenario: new recipe is selected, and mealplan slot is blank - UPDATE SELECTED RECIPE AND POPULATE MEAL PLAN SLOT
    case 'populate-mealplan-slot':
      db.User.findById(res.locals.currentUser.id, function(err, user) {
        if (err) { console.log("Error finding user in db", err); };
        // increment selected recipe's active count
        for (let i = 0; i < user.recipes.length; i++) {
          if (user.recipes[i].recipeName === req.body['selected-recipe-name']) {
            user.recipes[i].activeCount += 1;
          }
        }
        // update mealplan slot to selected recipe
        user.mealPlan.splice(req.body['selected-meal-plan-slot-id'],1,req.body['selected-recipe-name']);
        user.save();
        res.render('home');
      })
      break;
    // scenario: new recipe is selected, and mealplan slot is not blank - UPDATE PREVIOUS AND SELECTED RECIPE, AND REPLACE MEAL PLAN SLOT
    case 'replace-mealplan-slot':
      db.User.findById(res.locals.currentUser.id, function(err, user) {
        if (err) { console.log("Error finding user in db", err); };
        // decrement previous recipe's active count, and increment selected recipe's active count
        for (let i = 0; i < user.recipes.length; i++) {
          if (user.recipes[i].recipeName === req.body['selected-meal-plan-slot-existing-recipe']) {
            user.recipes[i].activeCount > 0 ? user.recipes[i].activeCount -= 1 : user.recipes[i].activeCount = 0;
          }
          if (user.recipes[i].recipeName === req.body['selected-recipe-name']) {
            user.recipes[i].activeCount += 1;
          }
        }
        // update mealplan slot to selected recipe
        user.mealPlan.splice(req.body['selected-meal-plan-slot-id'],1,req.body['selected-recipe-name']);
        user.save();
        res.render('home');
      })
      break;
  }
});

router.get('/:id', isLoggedIn, (req, res) => {
  db.User.findById(res.locals.currentUser._id, function(err, user) {
    let userRecipe = user.recipes.id(req.params.id);
    console.log('userRecipe:', userRecipe);
    res.render('recipes/show', {userRecipe: userRecipe});
  });
});

// DELETE route to remove selected recipe from the db
router.delete('/:id', isLoggedIn, (req, res) => {
  let recipeIdToRemove = req.params.id;
  db.User.findById(res.locals.currentUser._id, function(err, user) {
    if (err) { console.log("Error finding user in db", err) };
    user.recipes.id(req.params.id).remove();
    user.save();
    res.status(200).send();
  })
})

// allow other files to access the routes defined here
module.exports = router;
