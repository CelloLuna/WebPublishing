//IMPORTS
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//EJS MIDDLEWARE
app.use(expressLayouts);
app.set('view engine', 'ejs');

//ROUTES
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));
//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started successfully at http://localhost:${PORT}`));
