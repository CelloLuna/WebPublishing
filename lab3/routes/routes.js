const express = require('express');
const router = express.Router();
const multer = require('multer');

router.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

module.exports = router;
