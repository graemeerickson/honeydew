// the mongoose.connect line needs to happen exactly once in your code
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/honeydew');

module.exports.User = require("./user.js");
module.exports.Ingredient = require("./ingredient.js");
module.exports.Recipe = require("./recipe.js");
