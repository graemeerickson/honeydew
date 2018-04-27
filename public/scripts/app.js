var userRecipes = [];
var userMealPlan = [];
var userId;
var editRecipeId;

$(document).ready(function() {
  $.ajax({
    method: 'GET',
    url: `/api/recipes`,
    success: getUserDetails,
    error: handleError
  });

  $('.editRecipeBtn').on('click',function(e) {
    console.log($(this).data().id);
    e.preventDefault;
    console.log('Recipe Id:', $(this).data().id);
    $.ajax({
      method: 'POST',
      url: '/profile/editRecipe',
      data: $(this).data(),
    })
  })
});

function getRecipeHtml(recipe) {
  let recipeName = recipe.recipeName;
  let html = `<div class="draggableRecipe" style="display: inline;"><span class="badge badge-pill badge-outline">${recipeName}</span></div>&nbsp`
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

  // $(function() { $('.draggableRecipe').draggable(); });
  
  // setEventListeners();
};

function getUserDetails(json) {
  userRecipes = json[0].recipes;
  userMealPlan = json[0].mealPlan;
  userId = json[0]._id;
  renderHomePage();
}

// $(function() {
//     $(document).on('click', '.btn-add', function(e) {
//         e.preventDefault();

//         var controlForm = $('.controls form:first'),
//             currentEntry = $(this).parents('.entry:first'),
//             newEntry = $(currentEntry.clone()).appendTo(controlForm);

//         newEntry.find('input').val('');
//         controlForm.find('.entry:not(:last) .btn-add')
//             .removeClass('btn-add').addClass('btn-remove')
//             .removeClass('btn-success').addClass('btn-danger')
//             .html('<span class="glyphicon glyphicon-minus"></span>');
//     }).on('click', '.btn-remove', function(e) {
//       $(this).parents('.entry:first').remove();
//       e.preventDefault();
//       return false;
//     });
// });

function handleError() {
  console.log('handleError');
}
