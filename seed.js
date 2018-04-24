var db = require("./models");

var sampleMealPlan = [
  {
    dayOfWeek: 'Sunday'
  },
  {
    dayOfWeek: 'Monday'
  },
  {
    dayOfWeek: 'Tuesday'
  },
  {
    dayOfWeek: 'Wednesday'
  },
  {
    dayOfWeek: 'Thursday'
  },
  {
    dayOfWeek: 'Friday'
  },
  {
    dayOfWeek: 'Saturday'
  }
];
console.log('sampleMealPlan:', sampleMealPlan);

var sampleRecipes = [];

sampleRecipes.push({ recipeName: 'breakfastRecipe' });
sampleRecipes.push({ recipeName: 'lunchRecipe' });
sampleRecipes.push({ recipeName: 'dinnerRecipe' });

var sampleIngredients = 'apple';

sampleRecipes.forEach( (recipe) => {
  recipe.servingSize = 1,
  recipe.ingredients = {sampleIngredients},
  recipe.selected = true
});

console.log('sampleRecipes:', sampleRecipes);

sampleMealPlan.forEach( (day) => {
  day.recipes = sampleRecipes;
});

console.log('sampleMealPlan:', sampleMealPlan);

db.MealPlan.remove({}, function(err, mealPlan){

  db.MealPlan.create(sampleMealPlan, function(err, mealPlan){
    if (err) { return console.log('ERROR', err); }
    console.log("all mealPlans:", mealPlan);
    console.log("created", mealPlan.length, "mealPlan");
    process.exit();
  });

});
