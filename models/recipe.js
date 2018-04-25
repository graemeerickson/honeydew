const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ingredient = require('./ingredient.js')

const recipeSchema = new Schema({
  recipeName: String,
  servingSize: Number,
  ingredients: [ Ingredient.schema ],
  activeCount: Number
});

const Recipe = mongoose.model('Recipe',recipeSchema);

module.exports = Recipe;
