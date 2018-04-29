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

  // populate mealplan with active recipes
  $('.mealPlanSlot').each(function(index) {
    let elementId = $(this)[0].id;
    $(this).text(userMealPlan[elementId])
  })
};

function setRecipeAndMealplanEventListeners() {
  // event listener on recipes in recipe bank
  $('.badge-pill').on('click', function(e) {
    console.log('selectedRecipeName:', e.target.innerText);
    console.log('selectedRecipeId:', e.target.id);
    $('.active').removeClass('active');
    selectedRecipeId = e.target.id;
    selectedRecipeName = e.target.innerText;
    $(this).addClass('active');
  })

  // event listener on meal plan slots to update slot with selected recipe
  $('.mealPlanSlot').on('click', function(e) {  
    let scenario;
    let recipeStatus;
    let mealPlanSlotStatus;

    $('.active').removeClass('active');
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
