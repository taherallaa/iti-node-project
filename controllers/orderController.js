require("dotenv").config();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");
const handleError = require("../custome-errors/handle-error");

module.exports.order = asyncHandler(async (req, res) => {
  /// read id form params
  const cartId = req.params.id;

  /// read a token form headers to retrive [id, userName]
  const token = req.headers.authorization;
  const decode = jwt.verify(token, process.env.token_secret);
  const userName = decode.userName;
  const userEmail = decode.email;
  const userId = decode.id;

  /// Note: Forntend must make validation for buy button diable if no there are not cart for this user...

  /// get cart

  const cart = await cartModel.findById(cartId);

  /// add order
  const order = await orderModel.create({
    _id: userId,
    userName,
    email: userEmail,
    cart,
  });

  await cartModel.findByIdAndDelete(cartId);
  /// simulation time that should user wait to get his order
  // setTimeout(async () => {
  //   await orderModel.findByIdAndDelete(userId);
  // }, 9000);

  res.json(order);
});

module.exports.show_my_order = asyncHandler(async (req, res) => {
  const token = req.headers.authorization;
  const userId = jwt.verify(token, process.env.token_secret).id;
  const order = await orderModel.findById(userId).select("cart -_id");
  console.log(order);
  if (order) {
    res.send(order);
  } else {
    res.json({ message: "you don't order anything yet" });
  }
});

module.exports.show_all_order = asyncHandler(async (req, res) => {
  await orderModel
    .find()
    .then((cart) => {
      res.send(cart);
    })
    .catch((err) => {
      res.send(handleError(err));
    });
});
