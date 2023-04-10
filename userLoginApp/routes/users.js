const express = require('express');
const router = express.Router();

//LOGIN PAGE
router.get('/login', (req, res) => res.render('login', { title: 'Login' }));

//REGISTRATION PAGE
router.get('/register', (req, res) => res.render('register', { title: 'Register' }));
module.exports = router;
