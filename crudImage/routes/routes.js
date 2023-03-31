const express = require('express');
const router = express.Router();
title = '';
router.get('/', (req, res) => {
  title = 'Home Page';
  res.render('index', { title });
});
router.get('/users', (req, res) => {
  res.send('All users');
});
router.get('/add', (req, res) => {
  title = 'Add Users';
  res.render('addUsers', { title });
});

module.exports = router;
