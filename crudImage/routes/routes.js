const express = require('express');
const router = express.Router();
const User = require('../models/users');
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

//edit user
router.get('/edit/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let userToEdit = await User.findById(id);
    if (userToEdit == null) {
      res.redirect('/');
    } else {
      res.render('editUsers', { title: 'Edit User', user: userToEdit });
    }
  } catch (e) {
    console.log('Edit user error: ' + e.message);
  }
});

router.post('/update/:id', upload, async (req, res) => {
  try {
    let id = req.params.id;
    let new_image = '';
    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync('./uploads/' + req.body.old_image);
      } catch (e) {
        console.log('Upload Image ERROR: ' + e.message);
      }
    } else {
      new_image = req.body.old_image;
    }
    let result = await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: new_image,
    });
    req.session.message = {
      type: 'success',
      message: 'User Updated Successfully',
    };
    res.redirect('/');
  } catch (e) {
    console.log('Update Error: ' + e.message);
    res.json({ message: e.message, type: 'danger' });
  }
});

module.exports = router;
