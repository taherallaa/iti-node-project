const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    unique: [true, "this user is uesed"],
    minlength: [10, "at least 10 letters"],
  },
  price: {
    type: Number,
    required: [true, "Enter Email"],
  },
  description: {
    type: String,
    unique: [true, "Please Enter Valid description"],
    required: [true, "Please Enter description"],
    minlength: [10, "at least 10 characters"],
  },
});

module.exports = productSchema;
