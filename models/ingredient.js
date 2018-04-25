const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  ingredientName: String,
});

const Ingredient = mongoose.model('Ingredient',ingredientSchema);

module.exports = Ingredient;
