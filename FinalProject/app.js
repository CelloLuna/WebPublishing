//imports
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');

//passport
const passport = require('passport');
require('./config/passport')(passport);

//config
require('dotenv').config();
const PORT = process.env.PORT;

//db
const mongoose = require('mongoose');
const DB = process.env.DB_URI;

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo Database Connected'))
  .catch((err) => console.log('Database connection error: ', err));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('view engine', 'ejs');

//session
const SECRET_KEY = process.env.SESSION_KEY;
app.use(
  session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//global variables for messages
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

//routes
app.use('/', require('./routes/login'));
app.use('/', require('./routes/pages'));

app.listen(PORT, console.log(`App started at http://localhost:${PORT}`));
