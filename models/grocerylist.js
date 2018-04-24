const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ingredient = require('./ingredient.js')

const groceryListSchema = new Schema({
  grocerylistName: String,
  ingredients: [ Ingredient.schema ]
});

const GroceryList = mongoose.model('GroceryList',groceryListSchema);

module.exports = GroceryList;
