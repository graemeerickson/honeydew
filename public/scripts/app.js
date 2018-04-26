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
  let recipeName = recipe.recipeName;
  let html = `<span class="badge badge-pill badge-light">${recipeName}</span>`
  return html;
}

function getMealPlanHtml(userMealPlan) {
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
                    <th scope="row" id="breakfastRow">Breakfast</th>
                    <td>${userMealPlan[0]}</td>
                    <td>${userMealPlan[1]}</td>
                    <td>${userMealPlan[2]}</td>
                    <td>${userMealPlan[3]}</td>
                    <td>${userMealPlan[4]}</td>
                    <td>${userMealPlan[5]}</td>
                    <td>${userMealPlan[6]}</td>
                  </tr>
                  <tr>
                    <th scope="row" id="lunchRow">Lunch</th>
                    <td>${userMealPlan[7]}</td>
                    <td>${userMealPlan[8]}</td>
                    <td>${userMealPlan[9]}</td>
                    <td>${userMealPlan[10]}</td>
                    <td>${userMealPlan[11]}</td>
                    <td>${userMealPlan[12]}</td>
                    <td>${userMealPlan[13]}</td>
                  </tr>
                  <tr>
                    <th scope="row" id="dinnerRow">Dinner</th>
                    <td>${userMealPlan[14]}</td>
                    <td>${userMealPlan[15]}</td>
                    <td>${userMealPlan[16]}</td>
                    <td>${userMealPlan[17]}</td>
                    <td>${userMealPlan[18]}</td>
                    <td>${userMealPlan[19]}</td>
                    <td>${userMealPlan[20]}</td>
                  </tr>
                  <tr>
                    <th scope="row" id="dessertRow">Dessert</th>
                    <td>${userMealPlan[21]}</td>
                    <td>${userMealPlan[22]}</td>
                    <td>${userMealPlan[23]}</td>
                    <td>${userMealPlan[24]}</td>
                    <td>${userMealPlan[25]}</td>
                    <td>${userMealPlan[26]}</td>
                    <td>${userMealPlan[27]}</td>
                  </tr>
                </tbody>
              </table>`
  return html;
}

function getAllRecipesHtml(userRecipes) {
  return userRecipes.map(getRecipeHtml).join("");
}

function renderHomePage () {
  var recipeBankDiv = $('#recipeBank');
  var mealPlanDiv = $('#mealPlanCalendar');
  
  // empty existing recipe bank and mealplan from view
  recipeBankDiv.empty();
  mealPlanDiv.empty();

  // pass userRecipes into the template function
  let userRecipesHtml = getAllRecipesHtml(userRecipes);

  // pass userMealPlan into the template function
  let userMealPlanHtml = getMealPlanHtml(userMealPlan);

  // append html to the view
  recipeBankDiv.append(userRecipesHtml);
  mealPlanDiv.append(userMealPlanHtml);
  
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
