// var db = require("./models");
var db = require("./models");
const NUM_OF_TIME_SLOTS = 28;

// POPULATE RECIPES
var sampleRecipes = [];

sampleRecipes.push({ recipeName: 'breakfastRecipe' });
sampleRecipes.push({ recipeName: 'lunchRecipe' });
sampleRecipes.push({ recipeName: 'dinnerRecipe' });

// var sampleIngredients = 'apple';

sampleRecipes.forEach( (recipe) => {
  recipe.servingSize = 1,
  recipe.ingredients = ['apple', 'orange'],
  recipe.activeCount = 0
});

console.log('sampleRecipes:', sampleRecipes);

// POPULATE MEALPLAN
var mealPlan = [];
for (let i = 0; i < NUM_OF_TIME_SLOTS; i++) {
  mealPlan.push('');
}

console.log('mealPlan:', mealPlan);

db.User.findOneAndUpdate({ _id: '5adfc0b829ea87c828775298'}, { recipes: {}, mealPlan: [] }, function(err, user) {
  if (err) return console.log('err:', err);
  console.log('entered findOneAndUpdate to remove');
})

// POPULATE USER RECORD WITH RECIPE IDs
db.User.findOneAndUpdate({ _id: '5adfc0b829ea87c828775298'}, { recipes: {sampleRecipes}, mealPlan: mealPlan }, function(err, user) {
  if (err) return console.log('err:', err);
  console.log('entered findOneAndUpdate');
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
