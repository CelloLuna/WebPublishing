const mongoose = require('mongoose');

const prodouctSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Users', prodouctSchema);
