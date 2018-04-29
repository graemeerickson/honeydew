var userRecipes = [];
var userMealPlan = [];
var userId;
var editRecipeId;
var selectedRecipeName;
var selectedRecipeId;
var selectedMealPlanSlotId;

$(document).ready(function() {
  
  // initial ajax call to get all user details, including recipes & mealplan
  $.ajax({
    method: 'GET',
    url: `/api/recipes`,
    success: getUserDetails,
    error: handleError
  });

  // set event listener on the Edit Recipe buttons on the Profile page
  $('.editRecipeBtn').on('click',function(e) {
    e.preventDefault;
    $.ajax({
      method: 'POST',
      url: '/profile/editRecipe',
      data: $(this).data()
    })
  })

  // set event listener on the Delete Recipe button on the Edit Recipe page
  $('#deleteRecipeBtn').on('click',function(e) {
    e.preventDefault;
    $.ajax({
      method: 'DELETE',
      url: '/profile/editRecipe',
      data: $(this).data(),
      success: handleSuccess,
      error: handleError
    })
  })

  // set event listener on the Edit Recipe form to capture info on submit
  $('#editRecipeForm').on('submit',function(e) {
    console.log($(this));
    e.preventDefault;
    console.log('Recipe Id:', $(this).data().id);
    $.ajax({
      method: 'PUT',
      url: '/profile/editRecipe',
      data: $(this).data(),
      success: handleSuccess,
      error: handleError
    })
  })
});

function getRecipeHtml(recipe) {
  let recipeName = recipe.recipeName;
  let recipeId = recipe._id;
  let html = `<span class="badge badge-pill badge-outline" id="${recipeId}">${recipeName}</span>&nbsp`
  return html;
}

function getMealPlanHtml(userMealPlan) {
  let screenWidth = screen.width;
  let htmlDesktop = `<table class="table table-bordered">
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
                          <td class="mealPlanSlot" id="0">${userMealPlan[0]}</td>
                          <td class="mealPlanSlot" id="1">${userMealPlan[1]}</td>
                          <td class="mealPlanSlot" id="2">${userMealPlan[2]}</td>
                          <td class="mealPlanSlot" id="3">${userMealPlan[3]}</td>
                          <td class="mealPlanSlot" id="4">${userMealPlan[4]}</td>
                          <td class="mealPlanSlot" id="5">${userMealPlan[5]}</td>
                          <td class="mealPlanSlot" id="6">${userMealPlan[6]}</td>
                        </tr>
                        <tr>
                          <th scope="row" id="lunchRow">Lunch</th>
                          <td class="mealPlanSlot" id="7">${userMealPlan[7]}</td>
                          <td class="mealPlanSlot" id="8">${userMealPlan[8]}</td>
                          <td class="mealPlanSlot" id="9">${userMealPlan[9]}</td>
                          <td class="mealPlanSlot" id="10">${userMealPlan[10]}</td>
                          <td class="mealPlanSlot" id="11">${userMealPlan[11]}</td>
                          <td class="mealPlanSlot" id="12">${userMealPlan[12]}</td>
                          <td class="mealPlanSlot" id="13">${userMealPlan[13]}</td>
                        </tr>
                        <tr>
                          <th scope="row" id="dinnerRow">Dinner</th>
                          <td class="mealPlanSlot" id="14">${userMealPlan[14]}</td>
                          <td class="mealPlanSlot" id="15">${userMealPlan[15]}</td>
                          <td class="mealPlanSlot" id="16">${userMealPlan[16]}</td>
                          <td class="mealPlanSlot" id="17">${userMealPlan[17]}</td>
                          <td class="mealPlanSlot" id="18">${userMealPlan[18]}</td>
                          <td class="mealPlanSlot" id="19">${userMealPlan[19]}</td>
                          <td class="mealPlanSlot" id="20">${userMealPlan[20]}</td>
                        </tr>
                        <tr>
                          <th scope="row" id="dessertRow">Dessert</th>
                          <td class="mealPlanSlot" id="21">${userMealPlan[21]}</td>
                          <td class="mealPlanSlot" id="22">${userMealPlan[22]}</td>
                          <td class="mealPlanSlot" id="23">${userMealPlan[23]}</td>
                          <td class="mealPlanSlot" id="24">${userMealPlan[24]}</td>
                          <td class="mealPlanSlot" id="25">${userMealPlan[25]}</td>
                          <td class="mealPlanSlot" id="26">${userMealPlan[26]}</td>
                          <td class="mealPlanSlot" id="27">${userMealPlan[27]}</td>
                        </tr>
                      </tbody>
                    </table>`;
  let htmlMobile = `<table class="table table-bordered">
                      <tbody>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Sunday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td>${userMealPlan[0]}</td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td>${userMealPlan[7]}</td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td>${userMealPlan[14]}</td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td>${userMealPlan[21]}</td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Monday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td>${userMealPlan[1]}</td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td>${userMealPlan[8]}</td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td>${userMealPlan[15]}</td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td>${userMealPlan[22]}</td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Tuesday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td>${userMealPlan[2]}</td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td>${userMealPlan[9]}</td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td>${userMealPlan[16]}</td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td>${userMealPlan[23]}</td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Wednesday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td>${userMealPlan[3]}</td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td>${userMealPlan[10]}</td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td>${userMealPlan[17]}</td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td>${userMealPlan[24]}</td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Thursday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td>${userMealPlan[4]}</td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td>${userMealPlan[11]}</td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td>${userMealPlan[18]}</td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td>${userMealPlan[25]}</td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Friday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td>${userMealPlan[5]}</td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td>${userMealPlan[12]}</td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td>${userMealPlan[19]}</td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td>${userMealPlan[26]}</td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="mobileDay text-center">Saturday</th>
                        </tr>
                        <tr>
                          <td>Breakfast</td>
                          <td>${userMealPlan[6]}</td>
                        </tr>
                        <tr>
                          <td>Lunch</td>
                          <td>${userMealPlan[13]}</td>
                        </tr>
                        <tr>
                          <td>Dinner</td>
                          <td>${userMealPlan[20]}</td>
                        </tr>
                        <tr>
                          <td>Dessert</td>
                          <td>${userMealPlan[27]}</td>
                        </tr>
                      </tbody>
                    </table>`;
  if (screenWidth > 414) {
    return htmlDesktop;
  } else {
    return htmlMobile;
  }
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
};

function setRecipeAndMealplanEventListeners() {
  // event listener on recipes in recipe bank
  $('.badge-pill').on('click', function(e) {
    console.log('selectedRecipeName:', e.target.innerText);
    console.log('selectedRecipeId:', e.target.id);
    selectedRecipeId = e.target.id;
    selectedRecipeName = e.target.innerText;
  })

  // event listener on meal plan slots to update slot with selected recipe
  $('.mealPlanSlot').on('click', function(e) {  
    let scenario;
    let recipeStatus;
    let mealPlanSlotStatus;

    selectedMealPlanSlotId = e.target.id;
    selectedMealPlanSlotExistingRecipe = e.target.innerText;
    selectedRecipeId == undefined ? recipeStatus = 'not selected' : recipeStatus = 'selected';
    selectedMealPlanSlotExistingRecipe === '' ? mealPlanSlotStatus = 'empty' : mealPlanSlotStatus = 'populated';

    // scenario: no new recipe is selected, and mealplan slot is blank - DO NOTHING
    if (recipeStatus === 'not selected' && mealPlanSlotStatus === 'empty') {
      console.log('scenario: no new recipe is selected, and mealplan slot is blank - DO NOTHING');
    }
    // scenario: no new recipe is selected, and mealplan slot is not blank - UPDATE PREVIOUS RECIPE AND CLEAR MEAL PLAN SLOT
    else if (recipeStatus === 'not selected' && mealPlanSlotStatus === 'populated') {
      console.log('scenario: no new recipe is selected, and mealplan slot is not blank - UPDATE PREVIOUS RECIPE AND CLEAR MEAL PLAN SLOT');
      scenario = 'clear-mealplan-slot';
      // decrement previous recipe's active count, and update mealplan slot with blank value
      $.ajax({
        method: 'PUT',
        url: '/api/recipes',
        data: {scenario, selectedMealPlanSlotId, selectedMealPlanSlotExistingRecipe},
        success: handleSuccess,
        error: handleError
      })
      e.target.innerText = '';
      userMealPlan.splice(selectedMealPlanSlotId,1,'');
    }
    // scenario: new recipe is selected, and mealplan slot is blank - UPDATE CURRENT RECIPE AND POPULATE MEAL PLAN SLOT
    else if (recipeStatus === 'selected' && mealPlanSlotStatus === 'empty') {
      console.log('scenario: new recipe is selected, and mealplan slot is blank - UPDATE CURRENT RECIPE AND POPULATE MEAL PLAN SLOT');
      scenario = 'populate-mealplan-slot';
      // increment selected recipe's active count, and update mealplan slot with recipe name
      $.ajax({
        method: 'PUT',
        url: '/api/recipes',
        data: {scenario, selectedMealPlanSlotId, selectedRecipeId, selectedRecipeName},
        success: handleSuccess,
        error: handleError
      })
      e.target.innerText = selectedRecipeName;
      userMealPlan.splice(selectedMealPlanSlotId,1,selectedRecipeName);
      selectedRecipeId = undefined;
      selectedRecipeName = '';
    }
    // scenario: new recipe is selected, and mealplan slot is not blank - UPDATE PREVIOUS AND CURRENT RECIPE, AND REPLACE MEAL PLAN SLOT
    else if (recipeStatus === 'selected' && mealPlanSlotStatus !== 'empty') {
      console.log('scenario: new recipe is selected, and mealplan slot is not blank - UPDATE PREVIOUS AND CURRENT RECIPE, AND REPLACE MEAL PLAN SLOT');
      scenario = 'replace-mealplan-slot';
      $.ajax({
        method: 'PUT',
        url: '/api/recipes',
        data: {scenario, selectedMealPlanSlotId, selectedMealPlanSlotExistingRecipe, selectedRecipeId, selectedRecipeName},
        success: handleSuccess,
        error: handleError
      })
      e.target.innerText = selectedRecipeName;
      userMealPlan.splice(selectedMealPlanSlotId,1,selectedRecipeName);
      selectedRecipeId = undefined;
      selectedRecipeName = '';
    }
  })
}

function getUserDetails(json) {
  userRecipes = json[0].recipes;
  userMealPlan = json[0].mealPlan;
  userId = json[0]._id;
  renderHomePage();
  setRecipeAndMealplanEventListeners();
}

function handleSuccess() {
  console.log('Ajax success response')
}
function handleError() {
  console.log('Ajax error response');
}
