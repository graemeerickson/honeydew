console.log('app.js is running');
var allRecipes = [];
var activeRecipes = [];

$(document).ready(function() {

  renderHomePage();

  $.ajax({
    method: 'GET',
    url: `api/recipes`,
    success: getAllRecipes,
    error: handleError
  });
});

function renderRecipeBank() {
  let html = `<span class="badge badge-pill badge-light">Eggs</span>
              <span class="badge badge-pill badge-light">BLT</span>
              <span class="badge badge-pill badge-light">Chili</span>
              <span class="badge badge-pill badge-light">Molten Chocolate Lava Cake</span><br><br>`
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

function renderHomePage () {
  var recipeBank = $('#recipeBank');
  var mealPlan = $('#mealPlanCalendar');
  // empty existing mealplan from view
  recipeBank.empty();
  mealPlan.empty();

  // pass `allTodos` into the template function
  // let albumHtml = getAllAlbumsHtml(allAlbums);

  // append html to the view
  // mealPlan.append(albumHtml);
  // mealPlan.append(renderHomePage);
  recipeBank.append(renderRecipeBank);
  mealPlan.append(renderMealPlan);
  
  // setEventListeners();
};

function getAllRecipes(json) {
  console.log(typeof json[0].recipes);
  allRecipes = json[0].recipes;
  console.log('allRecipes:', allRecipes);
}

function handleError() {
  console.log('handleError');
}