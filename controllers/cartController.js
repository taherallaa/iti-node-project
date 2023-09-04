require("dotenv").config();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");

module.exports.add_to_cart = asyncHandler(async (req, res) => {
  const { productId, productQuntity } = req.body;

  /// get product and check on it if it exist or not...
  const product = await productModel.findById(productId);
  let prodPrice = product.price;

  product.quntity = productQuntity;
  product.save();

  if (!product) {
    res.send("product not found");
    return;
  }

  let price = 0;

  /// using toke to get id of user to override it into document id...
  const { authorization: token } = req.headers;

  const userId = jwt.verify(token, process.env.token_secret).id;

  /// retrive existing cart...
  const existingCart = await cartModel.findById(userId);

  if (existingCart) {
    /// flag to avoid ErrorCaptureStackTrace(err);
    /// happen because send mulitple response to client;
    let exist = false;

    /// To assign flag and get total price
    existingCart.products.forEach((prod) => {
      price += prod.price * prod.quntity;
      if (prod._id == productId) exist = true;
    });

    if (exist) {
      product.quntity = product.quntity + 1;
      product.save();
      res.send("quntity increse one");

      return;
    } else {
      existingCart.products.forEach((prod) => {
        price += prod.price * prod.quntity;
      });

      /// add new product to the product array
      existingCart.products.push(product);

      /// update total price of chart...
      existingCart.totalPrice = price;

      existingCart.save();
      res.json(product);
    }
  } else {
    const cart = await cartModel.create({
      _id: userId,
      products: product,
      totalPrice: prodPrice * productQuntity,
      productQuntity,
    });
    res.json(cart);
  }
});

module.exports.show_all_carts = async (req, res) => {
  await cartModel
    .find()
    .then((carts) => {
      res.json(carts);
    })
    .catch((err) => res.send(err));
};

module.exports.show_my_cart = asyncHandler(async (req, res) => {
  const token = req.headers.authorization;
  const id = jwt.verify(token, process.env.token_secret).id;

  const cart = await cartModel.findById(id);
  if (cart) {
    res.json(cart);
  } else {
    res.json({ message: "you don't add prducts to cart yet" });
  }
});

module.exports.cart_cancel = asyncHandler(async (req, res) => {
  const token = req.headers.authorization;
  const userId = jwt.verify(token, process.env.token_secret).id;

  const cancelCart = await cartModel.findByIdAndDelete(userId);
  if (cancelCart) {
    res.send("Cart is Deleted ");
  } else {
    res.json({ message: "you don't add prducts to cart yet" });
  }
});
