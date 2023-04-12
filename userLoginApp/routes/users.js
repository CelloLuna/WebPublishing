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
    errors.push({ msg: 'Please enter all fields' });
  }
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
      title: 'Register',
    });
  } else {
    res.send('pass');
  }
});

module.exports = router;
