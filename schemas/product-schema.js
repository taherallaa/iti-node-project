const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    minlength: [10, "at least 10 letters"],
    unique: false,
  },
  price: {
    type: Number,
    required: [true, "Enter Email"],
  },
  description: {
    type: String,
    //unique: [true, "Please Enter Valid description"],
    unique: false,
    required: [true, "Please Enter description"],
    minlength: [10, "at least 10 characters"],
  },
});

module.exports = productSchema;
