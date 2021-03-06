// include modules
require('dotenv').config(); // loads the .env
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const db = require('./models');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const logger = require('morgan');
const mongoose = require('mongoose');
const multer = require('multer');
const passport = require('./config/passportConfig');
const path = require('path');
const session = require('express-session');
const upload = multer({ dest: './uploads/' });

// initialize app
const app = express();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/honeydew');

/* error logger, static routes */
app.use(logger('dev'));
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

// set and use statements. set view engine and use middleware.
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// maintain active user
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

// top-level route
app.get('/', (req, res) => {
  res.render('home')
});

// include routes from controllers
app.use('/recipes', require('./controllers/recipes'));
app.use('/auth', require('./controllers/auth'));
app.use('/grocerylist', require('./controllers/grocerylist'));
app.use('/profile', require('./controllers/profile'));

/* Error Handling */
app.get('*', function (req, res) {
    res.status(404).send('This is not the page you are looking for')
});

/* Listen on PORT */
app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`Listening on port: ${app.get('port')}`)
})
