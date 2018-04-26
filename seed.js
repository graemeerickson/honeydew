// var db = require("./models");
var db = require("./models");
const NUM_OF_TIME_SLOTS = 28;

var sampleIngredientsArr = [
  {
    ingredientName: 'apple'
  },
  {
    ingredientName: 'orange'
  }
];

console.log('sampleIngredientsArr:', sampleIngredientsArr)

// POPULATE RECIPES
var sampleRecipesArr = [
  {
    recipeName: 'recipeName 0',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    activeCount: 0
  },
  {
    recipeName: 'recipeName 1',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    activeCount: 0
  },
  {
    recipeName: 'recipeName 2',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    activeCount: 0
  }
];

console.log('sampleRecipesArr:', sampleRecipesArr);

// POPULATE MEALPLAN
var mealPlanArr = [];
for (let i = 0; i < NUM_OF_TIME_SLOTS; i++) {
  mealPlanArr.push('');
}

console.log('mealPlan:', mealPlanArr);

// POPULATE USER RECORD WITH RECIPES AND MEALPLAN
db.User.findOneAndUpdate({ _id: '5adfc0b829ea87c828775298'}, { recipes: sampleRecipesArr, mealPlan: mealPlanArr }, function(err, user) {
  console.log('hello');
  if (err) return console.log('err:', err);
});

// process.exit();
