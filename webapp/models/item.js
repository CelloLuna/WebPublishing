const mongoose = require('mongoose');
const schema = mongoose.Schema;
const itemSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model('items', itemSchema);
module.exports = Item;
