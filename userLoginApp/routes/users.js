const express = require('express');
const router = express.Router();

//LOGIN PAGE
router.get('/login', (req, res) => res.render('login', { title: 'Login' }));

//REGISTRATION PAGE
router.get('/register', (req, res) => res.render('register', { title: 'Register' }));

//REGISTER HANDLE
router.post('/register', (req, res) => {
  //console.log(req.body);
  //res.send('Register Handle');
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ mes: 'Please enter all fields' });
  } else {
    res.send('pass');
  }
});

module.exports = router;
