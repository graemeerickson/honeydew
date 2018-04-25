// the mongoose.connect line needs to happen exactly once in your code
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/honeydew");
// if (process.env.NODE_ENV == "production") {
//   mongoose.connect(process.env.MLAB_URL)
// } else {
//   mongoose.connect("mongodb://localhost/honeydew");
// }

module.exports.User = require("./user.js");
module.exports.Ingredient = require("./ingredient.js");
module.exports.Recipe = require("./recipe.js");
module.exports.GroceryList = require("./grocerylist.js");
module.exports.MealPlan = require("./mealplan.js");
