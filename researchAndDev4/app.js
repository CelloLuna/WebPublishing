//IMPORTS
const express = require('express');
const app = express();

//EJS MIDDLEWARE
app.set('view engine', 'ejs');

//EXPRESS BODY PARSER
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/register', (req, res) => {
  const { fName, lName, street, city, zipcode, state, country, email, phone } = req.body;
  let errors = [];

  //check required fields
  if (!fName || !lName || !street || !city || !zipcode || !state || !country || !email || !phone) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (errors.length > 0) {
    res.render('index', {
      errors,
      fName,
      lName,
      street,
      city,
      zipcode,
      state,
      country,
      email,
      phone,
    });
  } else {
  }
});
//PORT
const PORT = 5001;

app.listen(PORT, console.log(`Server started successfully at http://localhost:${PORT}`));
