const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = cartSchema;
