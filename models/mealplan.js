const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Recipe = require('./recipe.js')
const Ingredient = require('./ingredient.js')

const mealPlanSchema = new Schema({
  dayOfWeek: String,
  recipes: [ Recipe.schema ]
});

const MealPlan = mongoose.model('MealPlan',mealPlanSchema);

module.exports = MealPlan;
