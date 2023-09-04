const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    minlength: [5, "at least 10 letters"],
  },
  price: {
    type: Number,
    required: [true, "Enter Email"],
  },
  description: {
    type: String,
    required: [true, "Please Enter description"],
    minlength: [10, "at least 10 characters"],
  },
  quntity: {
    type: Number,
    default: 0,
  },
});

module.exports = productSchema;
