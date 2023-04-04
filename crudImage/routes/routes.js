const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');

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

//All users index
router.get('/', async (req, res) => {
  try {
    const usersFromDB = await User.find();
    res.render('index', {
      title: 'Home Page',
      users: usersFromDB,
    });
  } catch (e) {
    console.log('ERROR: ' + e.message);
    res.json({ message: e.message });
  }
});

//add users
router.get('/add', (req, res) => {
  res.render('addUsers', { title: 'Add Users' });
});

//add users form post
router.post('/add', upload, async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });
    await user.save();
    console.log('User ' + req.body.name + ' saved successfully');
    req.session.message = {
      type: 'success',
      message: 'user "' + req.body.name + '" added successfully',
    };
    res.redirect('/');
  } catch (e) {
    console.log('ERROR: ' + e);
  }
});

module.exports = router;
