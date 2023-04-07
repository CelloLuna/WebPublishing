const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Customers', customerSchema);
