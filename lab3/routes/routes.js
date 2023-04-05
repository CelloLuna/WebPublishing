const express = require('express');
const router = express.Router();
const multer = require('multer');

router.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

router.get('/viewCustomers', (req, res) => {
  res.render('viewCustomers', { title: 'View Customers' });
});
router.get('/viewProducts', (req, res) => {
  res.render('viewProducts', { title: 'View Products' });
});
router.get('/addCustomer', (req, res) => {
  res.render('addCustomer', { title: 'Add Customer' });
});
router.get('/addProduct', (req, res) => {
  res.render('addProduct', { title: 'Add Product' });
});

module.exports = router;
