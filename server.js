// include modules
require('dotenv').config(); // loads the .env
const bodyParser = require('body-parser');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('./config/passportConfig');
const path = require('path');
const session = require('express-session');
const db = require('./models');

// initialize app
const app = express();
mongoose.connect("mongodb://localhost/honeydew");

/* error logger, static routes */
app.use(logger('dev'));
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

// set and use statements. set view engine and use middleware.
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// just a convenience, but makes life easier...
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

// top-level routes
app.get('/', (req, res) => {
  let userMealPlan = db.MealPlan.find(function (err, meals){
    // res.json(albums);
    res.render('home')
  });
});

// include any routes from controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));
app.use('/api/recipes', require('./controllers/recipes'));

/* Error Handling */
app.get('*', function (req, res) {
    res.status(404).send('This is not the page you are looking for')
});

/* Listen on PORT */
app.set('port', process.env.PORT)

app.listen(app.get('port'), () => {
  console.log(`Listening on port: ${app.get('port')}`)
})
