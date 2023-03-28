const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.send('All users');
});
router.get('/', (req, res) => {
  res.send('Home Page');
});

module.exports = router;
