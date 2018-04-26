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
    recipeName: 'Eggs & Hashbrowns',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    activeCount: 0
  },
  {
    recipeName: 'BLT',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    activeCount: 0
  },
  {
    recipeName: 'Chicken Enchiladas',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    activeCount: 0
  },
  {
    recipeName: 'Chicken Pesto Pasta',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    activeCount: 0
  },
  {
    recipeName: 'Molten Lava Chocolate Cake',
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

mealPlanArr[0] = sampleRecipesArr[0].recipeName;
mealPlanArr[10] = sampleRecipesArr[1].recipeName;
mealPlanArr[14] = sampleRecipesArr[2].recipeName;
mealPlanArr[20] = sampleRecipesArr[3].recipeName;
mealPlanArr[27] = sampleRecipesArr[4].recipeName;

console.log('mealPlan:', mealPlanArr);

// POPULATE USER RECORD WITH RECIPES AND MEALPLAN
db.User.findOneAndUpdate({ _id: '5adfc0b829ea87c828775298'}, { recipes: sampleRecipesArr, mealPlan: mealPlanArr }, function(err, user) {
  if (err) {
    return console.log('err:', err);
  } else {
    console.log('db seeded :)');
  }
});

// process.exit();
