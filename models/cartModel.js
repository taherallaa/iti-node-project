const mongoose = require("mongoose");

const cartSchema = require("../schemas/cart-schema");

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
