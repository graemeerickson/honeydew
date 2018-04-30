const cloudinary = require('cloudinary');
const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const multer = require('multer');
const passport = require('../config/passportConfig');
const router = express.Router();
const upload = multer({ dest: './uploads/' });

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
router.post('/', isLoggedIn, upload.single('myFile'), (req, res) => {  
  console.log('req.body', req.body);
  console.log('typeof req.body.ingredientItemInput:', typeof req.body.ingredientItemInput)
  let ingredientsArr = [];
  // if just one ingredient in recipe, convert ingredient strings to arrays
  if (typeof req.body.ingredientItemInput === 'string') {
    let ingredientItemArr = [];
    ingredientItemArr.push(req.body.ingredientItemInput);
    let ingredientQtyArr = [];
    ingredientQtyArr.push(req.body.ingredientQtyInput);
    let ingredientMeasuringUnitArr = [];
    ingredientMeasuringUnitArr.push(req.body.ingredientMeasuringUnitSelect);

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
    for (let i = 0; i < req.body.ingredientItemInput.length; i++) {
      let tmpIngredientObj = {};
      tmpIngredientObj.ingredientName = req.body.ingredientItemInput[i];
      tmpIngredientObj.qty = req.body.ingredientQtyInput[i];
      tmpIngredientObj.measuringUnit = req.body.ingredientMeasuringUnitSelect[i];
      ingredientsArr.push(tmpIngredientObj);
    }
  };

  if (req.file !== undefined) {
    // create new recipe object with Cloudinary image url, then insert into user record. redirect user to homepage.
    cloudinary.uploader.upload(req.file.path, function(result) {
      console.log('running cloudinary uploader');
      let newRecipe = new db.Recipe({ recipeName: req.body.recipeNameInput, servingSize: req.body.servingSizeSelect, ingredients: ingredientsArr, prepInstructions: req.body.prepInstructionsTextArea, prepTime: req.body.prepTimeInput, cookTime: req.body.cookTimeInput, mealType: req.body.mealTypeSelect, imgUrl: result.url, activeCount: 0 })
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
    let newRecipe = new db.Recipe({ recipeName: req.body.recipeNameInput, servingSize: req.body.servingSizeSelect, ingredients: ingredientsArr, prepInstructions: req.body.prepInstructionsTextArea, prepTime: req.body.prepTimeInput, cookTime: req.body.cookTimeInput, mealType: req.body.mealTypeSelect, imgUrl: '', activeCount: 0 })
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
  console.log('req.body:', req.body);
  let scenario = req.body.scenario;

  // scenario: new recipe is selected, and mealplan slot is blank - UPDATE CURRENT RECIPE AND POPULATE MEAL PLAN SLOT
  if (scenario === 'clear-mealplan-slot') {
    db.User.findById(res.locals.currentUser.id, function(err, user) {
      if (err) { console.log("Error finding user in db", err); };
      // decrement cleared recipe's active count
      for (let i = 0; i < user.recipes.length; i++) {
        if (user.recipes[i].recipeName === req.body.selectedMealPlanSlotExistingRecipe) {
          user.recipes[i].activeCount > 0 ? user.recipes[i].activeCount -= 1 : user.recipes[i].activeCount = 0;
        }
      }
      // update mealplan slot to a blank value
      user.mealPlan.splice(req.body.selectedMealPlanSlotId,1,"");
      user.save();
      res.render('home');
    })
  }
  // scenario: new recipe is selected, and mealplan slot is blank - UPDATE CURRENT RECIPE AND POPULATE MEAL PLAN SLOT
  else if (scenario === 'populate-mealplan-slot') {
    db.User.findById(res.locals.currentUser.id, function(err, user) {
      if (err) { console.log("Error finding user in db", err); };
      // increment selected recipe's active count
      for (let i = 0; i < user.recipes.length; i++) {
        if (user.recipes[i].recipeName === req.body.selectedRecipeName) {
          user.recipes[i].activeCount += 1;
        }
      }
      // update mealplan slot to selected recipe
      user.mealPlan.splice(req.body.selectedMealPlanSlotId,1,req.body.selectedRecipeName);
      user.save();
      res.render('home');
    })
  }
  // scenario: new recipe is selected, and mealplan slot is not blank - UPDATE PREVIOUS AND CURRENT RECIPE, AND REPLACE MEAL PLAN SLOT
  else if (scenario === 'replace-mealplan-slot') {
    db.User.findById(res.locals.currentUser.id, function(err, user) {
      if (err) { console.log("Error finding user in db", err); };
      // decrement previous recipe's active count, and increment selected recipe's active count
      for (let i = 0; i < user.recipes.length; i++) {
        if (user.recipes[i].recipeName === req.body.selectedMealPlanSlotExistingRecipe) {
          user.recipes[i].activeCount > 0 ? user.recipes[i].activeCount -= 1 : user.recipes[i].activeCount = 0;
        }
        if (user.recipes[i].recipeName === req.body.selectedRecipeName) {
          user.recipes[i].activeCount += 1;
        }
      }
      // update mealplan slot to selected recipe
      user.mealPlan.splice(req.body.selectedMealPlanSlotId,1,req.body.selectedRecipeName);
      user.save();
      res.render('home');
    })
  }
})
// allow other files to access the routes defined here
module.exports = router;
