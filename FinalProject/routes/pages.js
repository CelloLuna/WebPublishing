const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
router.get('/', forwardAuthenticated, (req, res) => res.render('index', { title: 'Home' }));

router.get('/inventory', ensureAuthenticated, (req, res) => {
  res.render('inventory', {
    user: req.user,
    title: 'Inventory',
  });
});
module.exports = router;
