const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: [true, "Please, Enter Valid id"],
    require: [true, "{Please, Enter id for cart"],
  },
  product: {
    type: Object,
  },
  productQuntity: {
    type: [Number, "Please enter number"],
    default: 0,
  },
});

module.exports = cartSchema;
