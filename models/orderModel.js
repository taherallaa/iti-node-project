const mongoose = require("mongoose");

const orderSchema = require("../schemas/order-schema");

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
