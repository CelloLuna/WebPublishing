require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT;

//db conncetion
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (e) => console.log('connection error: ' + e));
db.once('open', () => console.log('DB Connected Successfully'));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//session
app.use(
  session({
    secret: 'secret key',
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//image folder
app.use(express.static('uploads'));

app.set('view engine', 'ejs');

app.use('', require('./routes/routes'));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
