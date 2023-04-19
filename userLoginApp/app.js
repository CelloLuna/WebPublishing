//IMPORTS
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');

const mongoose = require('mongoose');

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
//CONNECT FLASH
app.use(flash());

//GLOBAL VARIABLES
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});
//ROUTES
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));
//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started successfully at http://localhost:${PORT}`));
