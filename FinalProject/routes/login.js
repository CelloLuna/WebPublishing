const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

//user modal
const User = require('../modals/User');

//login page
router.get('/login', (req, res) => res.render('login', { title: 'Login' }));

//register page
router.get('/register', (req, res) => res.render('register', { title: 'Register' }));

//registartaion post
router.post('/register', (req, res) => {
  const { name, username, email, password } = req.body;
  let errors = [];

  if (!name || !username || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      username,
      email,
      password,
      title: 'Register',
    });
  } else {
    User.findOne({ $or: [{ email: email }, { username: username }] }).then((user) => {
      console.log(user);
      if (user) {
        if (user.email === email) {
          errors.push({ msg: 'Email Already Exists ' });
        }
        if (user.username === username) {
          errors.push({ msg: 'Username Already Exists ' });
        }
        res.render('register', {
          errors,
          name,
          username,
          email,
          password,
          title: 'Register',
        });
      } else {
        const newUser = new User({
          name,
          username,
          email,
          password,
        });
        //password bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((user) => {
              console.log(newUser);
              req.flash('success_msg', 'You are now registerd and can login');
              res.redirect('/login');
            });
          });
        });
      }
    });
  }
});

//login post
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/inventory',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
});

//logout handle
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
