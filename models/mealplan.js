const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({
  mealPlan: [ String ]
});

const MealPlan = mongoose.model('MealPlan',mealPlanSchema);

module.exports = MealPlan;
