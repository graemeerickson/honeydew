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
  // create new ingredients object
  // convert entered strings into arrays
  // let ingredientItemArr = req.body.ingredientItemInput.split(',');
  // let ingredientQtyArr = req.body.ingredientQtyInput.split(',');
  // let ingredientMeasuringUnitArr = req.body.ingredientMeasuringUnitSelect.split(',');
  let ingredientItemArr = [];
  ingredientItemArr.push(req.body.ingredientItemInput);
  let ingredientQtyArr = [];
  ingredientQtyArr.push(req.body.ingredientQtyInput);
  let ingredientMeasuringUnitArr = [];
  ingredientMeasuringUnitArr.push(req.body.ingredientMeasuringUnitSelect);

  console.log('ingredientItemArr:', ingredientItemArr);
  console.log('ingredientQtyArr:', ingredientQtyArr);
  console.log('ingredientMeasuringUnitArr:', ingredientMeasuringUnitArr);

  let ingredientsArr = [];
  for (let i = 0; i < ingredientItemArr.length; i++) {
    let tmpIngredientObj = {};
    tmpIngredientObj.ingredientName = ingredientItemArr[i];
    tmpIngredientObj.qty = ingredientQtyArr[i];
    tmpIngredientObj.measuringUnit = ingredientMeasuringUnitArr[i];
    ingredientsArr.push(tmpIngredientObj);
  }
  console.log('ingredientsArr:', ingredientsArr);

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
})

// allow other files to access the routes defined here
module.exports = router;
