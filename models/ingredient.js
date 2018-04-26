const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  ingredientName: String,
  qty: Number,
  measuringUnit: String
});

const Ingredient = mongoose.model('Ingredient',ingredientSchema);

module.exports = Ingredient;
