//IMPORTS
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const mongoose = require('mongoose');

//PASSPORT CONFIG
require('./config/passport')(passport);

//DB CONFIG
const db = require('./config/keys').MongoURI;

//CONNECT TO MONGODB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log);

//EJS MIDDLEWARE
app.use(expressLayouts);
app.set('view engine', 'ejs');

//EXPRESS BODY PARSER
app.use(express.urlencoded({ extended: true }));

//EXPRESS SESSION
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//CONNECT FLASH
app.use(flash());

//GLOBAL VARIABLES
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});
//ROUTES
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));
//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started successfully at http://localhost:${PORT}`));
