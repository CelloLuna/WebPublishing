const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('welcome', { title: 'Welcome' }));
router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    user: req.user,
    title: 'Welcome',
  });
});

module.exports = router;
