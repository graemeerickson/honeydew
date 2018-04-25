// var db = require("./models");
var db = require("./models");
// var ObjectId = require('mongodb').ObjectID;
// var ObjectId = require('mongoose').Schema.ObjectId;
var ObjectId = require('mongoose').Types.ObjectId;

// var sampleMealPlan = [
//   {
//     dayOfWeek: 'Sunday'
//   },
//   {
//     dayOfWeek: 'Monday'
//   },
//   {
//     dayOfWeek: 'Tuesday'
//   },
//   {
//     dayOfWeek: 'Wednesday'
//   },
//   {
//     dayOfWeek: 'Thursday'
//   },
//   {
//     dayOfWeek: 'Friday'
//   },
//   {
//     dayOfWeek: 'Saturday'
//   }
// ];
// console.log('sampleMealPlan:', sampleMealPlan);

// POPULATE RECIPES
var sampleRecipes = [];

sampleRecipes.push({ recipeName: 'breakfastRecipe' });
sampleRecipes.push({ recipeName: 'lunchRecipe' });
sampleRecipes.push({ recipeName: 'dinnerRecipe' });

// var sampleIngredients = 'apple';

sampleRecipes.forEach( (recipe) => {
  recipe.servingSize = 1,
  recipe.ingredients = ['apple'],
  recipe.ownedBy = '5adfc0b829ea87c828775298',
  recipe.active = 'FALSE'
});

console.log('sampleRecipes:', sampleRecipes);

// POPULATE USER RECORD WITH RECIPE IDs

// db.User.find({}, function(err) {
//   console.log('entered findOne');
//   // console.log(user);
// })


// db.User.findById(id, function(err, user) {
//   console.log('entered findOne');
//   if (err) return console.log('err:', err);
//   res.send('entered findOne');
//   // console.log(user);
// })

// db.User.findOne({_id: id}, function(err, user) {
//   console.log('entered findOne');
//   if (err) return console.log('err:', err);
//   res.send('entered findOne');
//   // console.log(user);
// })

db.User.findOneAndUpdate({ _id: '5adfc0b829ea87c828775298'}, { recipes: {sampleRecipes} }, function(err, user) {
  console.log('entered findOneAndUpdate');
  if (err) return console.log('err:', err);
  // res.send(user);
  // console.log('User:', user);
});

// REMOVE EXISTING MEAL PLAN AND CREATE NEW ONE
// db.MealPlan.remove({}, function(err, mealPlan){

//   db.MealPlan.create(sampleMealPlan, function(err, mealPlan){
//     if (err) { return console.log('ERROR', err); }
//     console.log("all mealPlans:", mealPlan);
//     console.log("created", mealPlan.length, "mealPlan");
//     process.exit();
//   });

// });
