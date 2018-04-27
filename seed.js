// var db = require("./models");
var db = require("./models");
const NUM_OF_TIME_SLOTS = 28;

var sampleIngredientsArr = [
  {
    ingredientName: 'apple',
    qty: 1/2,
    measuringUnit: 'whole'
  },
  {
    ingredientName: 'orange',
    qty: 2,
    measuringUnit: 'whole'
  }
];

console.log('sampleIngredientsArr:', sampleIngredientsArr)

// POPULATE RECIPES
var sampleRecipesArr = [
  {
    recipeName: 'Eggs & Hashbrowns',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    prepInstructions: 'Cook hashbrowns at high heat on stovetop. Fry eggs over-easy. Add tobasco.',
    prepTime: '0 minutes',
    cookTime: '20 minutes',
    mealType: 'Breakfast',
    activeCount: 0
  },
  {
    recipeName: 'BLT',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    prepInstructions: 'Chop lettuce & tomato. Cook bacon. Toast bread. Spread mayo on bread, and place bacon, lettuce, & tomato.',
    prepTime: '15 minutes',
    cookTime: '5 minutes',
    mealType: 'Lunch',
    activeCount: 0
  },
  {
    recipeName: 'Chicken Enchiladas',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    prepInstructions: 'Boil chicken. Prep sauce concoction. Spread across six tortillas. Roll and place tortillas in baking pan, then cook in oven at 400 degrees for 45 minutes.',
    prepTime: '15 minutes',
    cookTime: '30 minutes',
    mealType: 'Dinner',
    activeCount: 0
  },
  {
    recipeName: 'Chicken Pesto Pasta',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    prepInstructions: 'Placeholder prep instructions',
    prepTime: '30 minutes',
    cookTime: '15 minutes',
    mealType: 'Dinner',
    activeCount: 0
  },
  {
    recipeName: 'Molten Lava Chocolate Cake',
    servingSize: 1,
    ingredients: sampleIngredientsArr,
    prepInstructions: 'Placeholder prep instructions',
    prepTime: '25 minutes',
    cookTime: '20 minutes',
    mealType: 'Dessert',
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
