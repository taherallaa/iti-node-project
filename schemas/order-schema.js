const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: [true, "this user is uesed"],
  },
  email: {
    type: String,
    unique: [true, "Invalid Email"],
    required: [true, "Enter Email"],
    validate: [isEmail, "Invalid Email"],
  },
  cart: [],
});

orderSchema.plugin(mongooseUniqueValidator);
module.exports = orderSchema;
