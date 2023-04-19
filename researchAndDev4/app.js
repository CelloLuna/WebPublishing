//IMPORTS
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//EJS MIDDLEWARE
app.use(expressLayouts);
app.set('view engine', 'ejs');

//EXPRESS BODY PARSER
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.get('/', (req, res) => {
  res.render('index');
});
//PORT
const PORT = 5001;

app.listen(PORT, console.log(`Server started successfully at http://localhost:${PORT}`));
