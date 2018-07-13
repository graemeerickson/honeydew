var userRecipes = [];
var userMealPlan = [];
var selectedRecipeName;
var selectedRecipeId;
var selectedMealPlanSlotId;

$(document).ready(function() {
  
  // initial ajax call to get all user details, including recipes & mealplan
  $.ajax({
    method: 'GET',
    url: `/recipes`,
    success: getUserDetails,
    error: handleError
  });

  $(document).on('click', '.btn-add', function(e) {
    e.preventDefault();

    // source for this code that dynamically expands ingredients list:
    // https://bootsnipp.com/snippets/featured/dynamic-form-fields-add-amp-remove-bs3
    let controlForm = $('.controls');
    let currentEntry = $(this).parents('.entry:first');
    let newEntry = $(currentEntry.clone()).appendTo(controlForm);

    newEntry.find('input').val('');
    controlForm.find('.entry:not(:last) .btn-add')
               .removeClass('btn-add').addClass('btn-remove')
               .removeClass('btn-success').addClass('btn-danger')
               .html('<i class="fas fa-minus"></i>');
  }).on('click', '.btn-remove', function(e) {
    $(this).parents('.entry:first').remove();
    e.preventDefault();
    return false;
  });

  // set event listener on the Delete Recipe button on the View Recipe page
  $('#delete-recipe-btn').on('click',function(e) {
    let dataId = e.target.dataset.id;
    $.ajax({
      method: 'DELETE',
      url: `/recipes/${dataId}`,
      success: () => {
        location.href='/profile';
      },
      error: handleError
    })
  })
});

function getRecipeHtml(recipe) {
  let recipeName = recipe.recipeName;
  let recipeId = recipe._id;
  let html = `<button type="button" class="btn btn-outline-secondary btn-sm recipe-button" id="${recipeId}">${recipeName}</button>&nbsp&nbsp`
  return html;
}

function getAllRecipesHtml(userRecipes) {
  return userRecipes.map(getRecipeHtml).join("");
}

function populateMealPlanWithActiveRecipes() {
  $('.meal-plan-slot').each(function(index) {
    let elementId = $(this)[0].id;
    $(this).text(userMealPlan[elementId])
  })
}

function renderHomePage () {
  var recipeBankDiv = $('#recipe-bank');
  var mealPlanDiv = $('#meal-plan-calendar');
  
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

  populateMealPlanWithActiveRecipes();
};

function setRecipeAndMealplanEventListeners() {
  // event listener on recipes in recipe bank
  $('.recipe-button').on('click', function(e) {
    $('.active').removeClass('active');
    selectedRecipeId = e.target.id;
    selectedRecipeName = e.target.innerText;
    $(this).addClass('active');
  })

  // event listener on meal plan slots to update slot with selected recipe
  $('.meal-plan-slot').on('click', function(e) {  
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
      // no action required
    }
    // scenario: no new recipe is selected, and mealplan slot is not blank - UPDATE PREVIOUS RECIPE AND CLEAR MEAL PLAN SLOT
    else if (recipeStatus === 'not selected' && mealPlanSlotStatus === 'populated') {
      scenario = 'clear-mealplan-slot';
      // decrement previous recipe's active count, and update mealplan slot with blank value
      $.ajax({
        method: 'PUT',
        url: '/recipes',
        data: {scenario, selectedMealPlanSlotId, selectedMealPlanSlotExistingRecipe},
        success: handleSuccess,
        error: handleError
      })
      e.target.innerText = '';
      userMealPlan.splice(selectedMealPlanSlotId,1,'');
    }
    // scenario: new recipe is selected, and mealplan slot is blank - UPDATE CURRENT RECIPE AND POPULATE MEAL PLAN SLOT
    else if (recipeStatus === 'selected' && mealPlanSlotStatus === 'empty') {
      scenario = 'populate-mealplan-slot';
      // increment selected recipe's active count, and update mealplan slot with recipe name
      $.ajax({
        method: 'PUT',
        url: '/recipes',
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
      scenario = 'replace-mealplan-slot';
      $.ajax({
        method: 'PUT',
        url: '/recipes',
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
