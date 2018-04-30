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
<img width="495" alt="honeydew_screenshot_home_mobile" src="https://user-images.githubusercontent.com/5596001/39444559-0f29e0ca-4c6d-11e8-9cf8-afbfba7a7b65.png">

## If I had more time...
I would implement the following additional features:
* Drag & drop recipes to mealplan.
* Smarter, more summarized grocery list.
* A more efficient mechanism for adding recipes.