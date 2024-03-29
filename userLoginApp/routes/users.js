const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

const User = require('../module/User');

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
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email Already Exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
          title: 'Register',
        });
        console.log('test');
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        console.log(newUser + 'test');
        //password bcryot
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((user) => {
              console.log(newUser);
              req.flash('success_msg', 'You are now registered and can login');
              res.redirect('/login');
            });
          });
        });
      }
    });
  }
});

//LOGIN HANDLE
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
});

//LOGOUT HANDLE
router.get('/logout', (req, res, next) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/login');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
