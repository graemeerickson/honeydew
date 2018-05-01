
# Honeydew
[Log your recipes and start meal-planning now!](https://honeydew-app.herokuapp.com/ "Log your recipes and start meal-planning now")

## Project Proposal
A full-stack web app that enables users to more effectively plan their meals for the week.

## Objective & Project Details

Honeydew is designed to fast-track the meal-planning process. The user starts by logging their favorite recipes, which are then presented in a recipe bank to select and place within their calendar week.

By selecting a recipe and placing it into a mealplan slot (e.g., Monday, dinner), the recipe becomes 'active' so that its ingredients are added to the user's grocery list. Once the user is done placing recipes into their mealplan, they can view a summary of their recipes and required ingredients by clicking the "See grocery list" button.

Lastly, the user can view all their recipes on the Profile screen. Recipes are organized by meal type (i.e., breakfast, lunch, dinner, dessert), along with their photos and expected prep & cook times. The user can click into each recipe card to view more recipe details such as serving size, prep instructions, and list of ingredients.

From a technical perspective, honeydew is a full-stack web application. It uses HTML/CSS/Javascript/jQuery/Bootstrap on the front-end, Express on the back-end, and MongoDB for its database. Honeydew was also designed for both desktop & mobile. On desktop, the week's mealplan is laid out like a standard calendar with the days stretching horizontally. On mobile, the mealplan calendar is inverted, displaying the calendar days vertically instead. Mobile functionality was enabled by Bootstrap 4 plus specific media queries.

__Data Model__

Honeydew data models include:
* User: Object
  * name: String (e.g., 'Graeme')
  * email: String (e.g., 'graeme@erickson.com')
  * password: String
  * recipes: Array containing Recipe schema
  * mealPlan: Array of Strings
* Recipe: Object
  * recipeName: String (e.g., Granola)
  * servingSize: Number (e.g., 2)
  * prepInstructions: String (e.g., Bake in oven at 400 degrees)
  * activeCount: Number (e.g., 1)
  * ingredients: Array containing Ingredient schema
* Ingredient: Object
  * ingredientName: String (e.g., oats)
  * qty: String (e.g., 3.5)
  * measuringUnit: String (e.g., cups)

__Third Party API__

Honeydew integrates with [Cloudinary](https://cloudinary.com/ "Cloudinary") for 3rd party image storage, allowing the user to upload their most delicious-looking photos to go along with their recipes. Honeydew both writes to and reads from Cloudinary for image upload & image loading.

__Routes__

|URL|Method|Purpose
|--|--|--|
|/|GET|Render home screen (recipes & mealplan)
|/auth/login|GET|Render login screen
|/auth/login|POST|Accept login credentials
|/auth/signup|GET|Render signup screen
|/auth/signup|POST|Accept signup details
|/api/recipes|GET|Get user's recipes
|/api/recipes|POST|Create new recipe
|/api/recipes|PUT|Update existing recipe (to increment/decrement active count)
|/api/recipes|DELETE|Delete existing recipe
|/grocerylist|GET|Get user's active recipes with related ingredients
|/profile|GET|Get user's entire list of recipes
|/profile/viewRecipe|GET|Get selected recipe to view recipe details
|/profile/viewRecipe|POST|Post selected recipe ID to back-end
|/profile/viewRecipe|DELETE|Delete selected recipe

__Views__

|View|Purpose
|--|--|
|auth/login.ejs|Display login form
|auth/signup.ejs|Display signup form
|grocerylist.ejs|Display summary of active (selected) recipes as well as related ingredients.
|home.ejs|Display homepage - recipe bank, add recipe button, mealplan calendar w/ active meals, and grocery list button.
|layout.ejs|Initialize html. Link to stylesheets and scripts. Contain references to partial views & body of other views.
|partials/alerts.ejs|Flash success or error alerts to user.
|partials/header.ejs|Contain logo and links to login/logout, signup & profile.
|profile.ejs|Display user's recipes, organized by mealtype (i.e., breakfast, lunch, dinner, dessert) and with links to view specific recipe details.
|viewRecipe.ejs|Display specific selected recipe details.

__Selected Code Snippet__

The most complicated section of code relates to handling when the user places a recipe into his/her mealplan. The code below tackles the three possible scenarios:

 1. No new recipe is selected, and the mealplan slot is not blank. Action: Decrement the existing recipe's active count by one, and clear the mealplan slot of the recipe name.
 2. A new recipe is selected, and the mealplan slot is blank. Action: Increment selected recipe's active count by one, and populate the mealplan slot with the recipe name.
 3. A new recipe is selected, and the mealplan slot is not blank. Action: Decrement the existing recipe's active count by one, increment the selected recipe's active count by one, and update the mealplan slot with the selected recipe name.
```
// PUT route to update user's recipe & mealplan
router.put('/', isLoggedIn, (req,res) => {
  let scenario = req.body.scenario;

  // scenario: no new recipe is selected, and mealplan slot is not blank - UPDATE PREVIOUS RECIPE AND CLEAR MEAL PLAN SLOT
  switch (scenario) {
    case 'clear-mealplan-slot':
      db.User.findById(res.locals.currentUser.id, function(err, user) {
        if (err) { console.log("Error finding user in db", err); };
        // decrement cleared recipe's active count
        for (let i = 0; i < user.recipes.length; i++) {
          if (user.recipes[i].recipeName === req.body.selectedMealPlanSlotExistingRecipe) {
            user.recipes[i].activeCount > 0 ? user.recipes[i].activeCount -= 1 : user.recipes[i].activeCount = 0;
          }
        }
        // update mealplan slot to a blank value
        user.mealPlan.splice(req.body.selectedMealPlanSlotId,1,"");
        user.save();
        res.render('home');
      })
      break;
    // scenario: new recipe is selected, and mealplan slot is blank - UPDATE SELECTED RECIPE AND POPULATE MEAL PLAN SLOT
    case 'populate-mealplan-slot':
      db.User.findById(res.locals.currentUser.id, function(err, user) {
        if (err) { console.log("Error finding user in db", err); };
        // increment selected recipe's active count
        for (let i = 0; i < user.recipes.length; i++) {
          if (user.recipes[i].recipeName === req.body.selectedRecipeName) {
            user.recipes[i].activeCount += 1;
          }
        }
        // update mealplan slot to selected recipe
        user.mealPlan.splice(req.body.selectedMealPlanSlotId,1,req.body.selectedRecipeName);
        user.save();
        res.render('home');
      })
      break;
    // scenario: new recipe is selected, and mealplan slot is not blank - UPDATE PREVIOUS AND SELECTED RECIPE, AND REPLACE MEAL PLAN SLOT
    case 'replace-mealplan-slot':
      db.User.findById(res.locals.currentUser.id, function(err, user) {
        if (err) { console.log("Error finding user in db", err); };
        // decrement previous recipe's active count, and increment selected recipe's active count
        for (let i = 0; i < user.recipes.length; i++) {
          if (user.recipes[i].recipeName === req.body.selectedMealPlanSlotExistingRecipe) {
            user.recipes[i].activeCount > 0 ? user.recipes[i].activeCount -= 1 : user.recipes[i].activeCount = 0;
          }
          if (user.recipes[i].recipeName === req.body.selectedRecipeName) {
            user.recipes[i].activeCount += 1;
          }
        }
        // update mealplan slot to selected recipe
        user.mealPlan.splice(req.body.selectedMealPlanSlotId,1,req.body.selectedRecipeName);
        user.save();
        res.render('home');
      })
      break;
  }
})
```

## Tools & Technologies
* HTML
* CSS
* Javascript
* [jQuery](http://jquery.com/ "jQuery")
* [Bootstrap 4](https://getbootstrap.com/ "Bootstrap"): nav, grid, buttons, button groups, popovers, modals
* MongoDB
* User Auth
* Npm modules: bcrypt, body-parser, cloudinary, connect-flash, dotenv, ejs, express, express-ejs-layouts, express-session, mongoose, morgan, multer, passport, passport-local, path
* [FontAwesome](https://fontawesome.com/ "FontAwesome")
* [Animate.css](https://daneden.github.io/animate.css/ "Animate.css")
* [Roboto Google Font](https://fonts.google.com/specimen/Roboto "Roboto Google Font")
* Github
* Heroku
* Trello

## Screenshots

#### Signup screen
<img width="495" alt="honeydew_screenshot_signup" src="https://user-images.githubusercontent.com/5596001/39444564-10054548-4c6d-11e8-8bfd-8b2585d62dc7.png">

#### Login screen
<img width="495" alt="honeydew_screenshot_login" src="https://user-images.githubusercontent.com/5596001/39444561-0f584c8a-4c6d-11e8-818f-bdef425113c9.png">

#### Home screen - recipes & mealplan
<img width="495" alt="honeydew_screenshot_home" src="https://user-images.githubusercontent.com/5596001/39444558-0f05a944-4c6d-11e8-8184-5cb75d19815d.png">

#### Add new recipe
<img width="495" alt="honeydew_screenshot_addrecipe" src="https://user-images.githubusercontent.com/5596001/39444554-0e5bdd6a-4c6d-11e8-8e47-82146d414a93.png">

#### Upload photo with recipe
<img width="495" alt="honeydew_screenshot_addrecipe_photoupload" src="https://user-images.githubusercontent.com/5596001/39444555-0e988670-4c6d-11e8-8146-3b58b008025e.png">

#### Profile screen
<img width="495" alt="honeydew_screenshot_profile" src="https://user-images.githubusercontent.com/5596001/39444563-0fe22874-4c6d-11e8-92b7-d0cafbec6ae6.png">

#### Grocery list
<img width="495" alt="honeydew_screenshot_grocerylist" src="https://user-images.githubusercontent.com/5596001/39444557-0ee039a2-4c6d-11e8-92d7-91aceccc0fe3.png">

#### Signup screen - mobile
<img width="495" alt="honeydew_screenshot_signup_mobile" src="https://user-images.githubusercontent.com/5596001/39444565-1029591a-4c6d-11e8-9645-3a2a0424e653.png">

#### Login screen - mobile
<img width="495" alt="honeydew_screenshot_login_mobile" src="https://user-images.githubusercontent.com/5596001/39444562-0fb67bac-4c6d-11e8-9d76-1909d8035958.png">

#### Home screen - mobile
<img width="495" alt="honeydew_screenshot_home_mobile" src="https://user-images.githubusercontent.com/5596001/39461146-a33eb7e0-4cbd-11e8-8fce-ead9248853e3.png">

## If I had more time...
I would implement the following additional features:
* Drag & drop recipes to mealplan.
* Smarter, more summarized grocery list.
* A more efficient mechanism for adding recipes.
