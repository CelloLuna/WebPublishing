const express = require('express');
const router = express.Router();
const Customer = require('../models/customers');
const Product = require('../models/products');
const multer = require('multer');
const fs = require('fs');

//image upload
var fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

//image middleware
var upload = multer({
  storage: fileStorage,
}).single('image');

//app routes
//index
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    const products = await Product.find();
    res.render('index', {
      title: 'Home Page',
      products: products,
      customers: customers,
    });
  } catch (e) {
    console.log('ERROR: ' + e.message);
    res.json({
      message: e.message,
      type: 'danger',
    });
  }
});

//customer routes
//view customers
router.get('/viewCustomers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.render('viewCustomers', {
      title: 'View Customers',
      customers: customers,
    });
  } catch (e) {
    console.log('ERROR: ' + e.message);
    res.json({
      message: e.message,
      type: 'danger',
    });
  }
});
//add customers
router.get('/addCustomer', (req, res) => {
  res.render('addCustomer', { title: 'Add Customer' });
});
//add post method
router.post('/addCustomer', upload, async (req, res) => {
  try {
    const cust = new Customer({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      phone: req.body.phone,
      profileImage: req.file.filename,
    });
    await cust.save();
    console.log('Customer ' + req.body.fName + ' ' + req.body.lName + ' saved successfully');
    req.session.message = {
      type: 'success',
      message: 'Customer ' + req.body.fName + ' ' + req.body.lName + ' saved successfully',
    };
    res.redirect('/viewCustomers');
  } catch (e) {
    console.log('Error Adding Customer: ' + e);
    // res.json({
    //   message: e.message,
    //   type: 'danger',
    // });
  }
});

//edit customer
router.get('/editCustomer/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let cust = await Customer.findById(id);
    if (cust == null) {
      res.redirect('/viewCustomers');
    } else {
      res.render('editCustomer', { title: 'Edit Customer', customer: cust });
    }
  } catch (e) {
    console.log('Edit Customer Error: ' + e.message);
  }
});
//edit post
router.post('/updateCustomer/:id', upload, async (req, res) => {
  try {
    let id = req.params.id;
    let newImage = '';

    if (req.file) {
      newImage = req.file.filename;
      try {
        fs.unlinkSync('./uploads/' + req.body.old_image);
      } catch (e) {
        console.log('Upload Image ERROR: ' + e.message);
      }
    } else {
      newImage = req.body.old_image;
    }
    let result = await Customer.findByIdAndUpdate(id, {
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      phone: req.body.phone,
      profileImage: newImage,
    });
    req.session.message = {
      type: 'success',
      message: 'Customer Updated Successfully',
    };
    res.redirect('/viewCustomers');
  } catch (e) {
    console.log('Update Error ' + e.message);
    res.json({ message: e.message, type: 'danger' });
  }
});

//delete customer
router.get('/deleteCustomer/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let result = await Customer.findByIdAndRemove(id);

    if (result.image != '') {
      try {
        fs.unlinkSync('./uploads' + result.image);
      } catch (e) {
        console.log('Delete Error ' + e.message);
      }
      req.session.message = {
        type: 'info',
        message: 'Customer Deleted Successfully',
      };
      res.redirect('/viewCustomers');
    }
  } catch (error) {
    console.log('Error Deleting: ' + e.message);
    res.json({ message: e.message });
  }
});

//product routes
//view products
router.get('/viewProducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('viewProducts', {
      title: 'View Products',
      products: products,
    });
  } catch (e) {
    console.log('ERROR: ' + e.message);
    res.json({
      message: e.message,
      type: 'danger',
    });
  }
});
//add products
router.get('/addProduct', (req, res) => {
  res.render('addProduct', { title: 'Add Product' });
});
//add post method
router.post('/addProduct', upload, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      qty: req.body.qty,
      image: req.file.filename,
    });
    await product.save();
    console.log('Product ' + req.body.name + ' saved successfully');
    req.session.message = {
      type: 'success',
      message: 'Product ' + req.body.name + ' saved successfully',
    };
    res.redirect('/viewProducts');
  } catch (e) {
    console.log('Error Adding Product: ' + e.message);
    res.json({
      message: e.message,
      type: 'danger',
    });
  }
});

//edit product
router.get('/editProduct/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findById(id);
    if (product == null) {
      res.redirect('/viewProducts');
    } else {
      res.render('editProduct', { title: 'Edit Product', product: product });
    }
  } catch (e) {
    console.log('Edit Product Error: ' + e.message);
  }
});
//edit post
router.post('/updateProduct/:id', upload, async (req, res) => {
  try {
    let id = req.params.id;
    let newImage = '';

    if (req.file) {
      newImage = req.file.filename;
      try {
        fs.unlinkSync('./uploads/' + req.body.old_image);
      } catch (e) {
        console.log('Upload Image ERROR: ' + e.message);
      }
    } else {
      newImage = req.body.old_image;
    }
    let result = await Product.findByIdAndUpdate(id, {
      name: req.body.fName,
      price: req.body.lName,
      qty: req.body.email,
      image: newImage,
    });
    req.session.message = {
      type: 'success',
      message: 'Product Updated Successfully',
    };
    res.redirect('/viewProducts');
  } catch (e) {
    console.log('Update Error ' + e.message);
    res.json({ message: e.message, type: 'danger' });
  }
});

//delete product
router.get('/deleteproduct/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let result = await Product.findByIdAndRemove(id);

    if (result.image != '') {
      try {
        fs.unlinkSync('./uploads' + result.image);
      } catch (e) {
        console.log('Delete Error ' + e.message);
      }
      req.session.message = {
        type: 'info',
        message: 'Product Deleted Successfully',
      };
      res.redirect('/viewProducts');
    }
  } catch (error) {
    console.log('Error Deleting: ' + e.message);
    res.json({ message: e.message });
  }
});

module.exports = router;
