console.log('app.js is running');
var userRecipes = [];
var userMealPlan = [];

$(document).ready(function() {
  $.ajax({
    method: 'GET',
    url: `api/recipes`,
    success: getUserDetails,
    error: handleError
  });
});

function getRecipeHtml(recipe) {
  console.log(recipe);
  let recipeName = recipe.recipeName;
  let html = `<span class="badge badge-pill badge-light">${recipeName}</span>`
  return html;
}

function renderMealPlan() {
  let html = `<table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Meal</th>
                    <th scope="col">Sun</th>
                    <th scope="col">Mon</th>
                    <th scope="col">Tue</th>
                    <th scope="col">Wed</th>
                    <th scope="col">Thu</th>
                    <th scope="col">Fri</th>
                    <th scope="col">Sat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Breakfast</th>
                    <td>Eggs</td>
                    <td>Eggs</td>
                    <td>Eggs</td>
                    <td>Eggs</td>
                    <td>Eggs</td>
                    <td>Eggs</td>
                    <td>Eggs</td>
                  </tr>
                  <tr>
                    <th scope="row">Lunch</th>
                    <td>BLT</td>
                    <td>BLT</td>
                    <td>BLT</td>
                    <td>BLT</td>
                    <td>BLT</td>
                    <td>BLT</td>
                    <td>BLT</td>
                  </tr>
                  <tr>
                    <th scope="row">Dinner</th>
                    <td>Chili</td>
                    <td>Chili</td>
                    <td>Chili</td>
                    <td>Chili</td>
                    <td>Chili</td>
                    <td>Chili</td>
                    <td>Chili</td>
                  </tr>
                  <tr>
                    <th scope="row">Dessert</th>
                    <td>Molten Chocolate Lava Cake</td>
                    <td>Molten Chocolate Lava Cake</td>
                    <td>Molten Chocolate Lava Cake</td>
                    <td>Molten Chocolate Lava Cake</td>
                    <td>Molten Chocolate Lava Cake</td>
                    <td>Molten Chocolate Lava Cake</td>
                    <td>Molten Chocolate Lava Cake</td>
                  </tr>
                </tbody>
            </table>`
  return html;
}

function getAllRecipesHtml(userRecipes) {
  return userRecipes.map(getRecipeHtml).join("");
}

function getMealPlanHtml(userRecipes) {
  return userMealPlan.map(getMealPlanHtml).join("");
}

function renderHomePage () {
  var recipeBank = $('#recipeBank');
  var mealPlan = $('#mealPlanCalendar');
  
  // empty existing recipe bank and mealplan from view
  recipeBank.empty();
  mealPlan.empty();

  // pass userRecipes into the template function
  let userRecipesHtml = getAllRecipesHtml(userRecipes);

  // pass userMealPlan into the template function
  // let userMealPlanHtml = getMealPlanHtml(userMealPlan);

  // append html to the view
  recipeBank.append(userRecipesHtml);
  mealPlan.append(renderMealPlan);
  
  // setEventListeners();
};

function getUserDetails(json) {
  userRecipes = json[0].recipes;
  userMealPlan = json[0].mealPlan;
  console.log("User's recipes:", userRecipes);
  console.log("User's meal plan:", userMealPlan);
  renderHomePage();
}

function handleError() {
  console.log('handleError');
}
