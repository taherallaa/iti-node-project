require("dotenv").config();
const jwt = require("jsonwebtoken");

const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const handleError = require("../custome-errors/handle-error");
const cartSchema = require("../schemas/cart-schema");

module.exports.add_to_cart = async (req, res) => {
  try {
    const { productId, productQuntity } = req.body;

    /// get product and check on it if it exist or not...
    const product = await productModel.findById(productId);
    if (!product) res.send("product not found");

    let price = 0;

    /// using toke to get id of user to override it into document id...
    const token =
      req.headers.authorization.split(" ")[1] || req.headers.authorization;
    const userId = jwt.verify(token, process.env.token_secret).id;

    /// retrive existing cart...
    const existingCart = await cartModel.findById(userId);

    if (existingCart) {
      /// flag to avoid ErrorCaptureStackTrace(err);
      /// happen because send mulitple response to client;
      let exist = false;
      existingCart.products.forEach((prod) => {
        price += prod.price;
        if (prod._id == productId) exist = true;
      });

      /// update total price of chart...
      existingCart.totalPrice = price;
      existingCart.save();

      if (exist) {
        res.send("this product is already add");
      } else {
        //console.log("taher", existingCart.products);
        existingCart.products.push(product);
        existingCart.save();
        res.json(product);
      }
    } else {
      console.log("iam on last else");
      const cart = await cartModel.create({
        _id: userId,
        products: product,
        totalPrice: price,
        productQuntity,
      });
      res.json(cart);
    }
    //res.send("ok");
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.send(errors);
  }
};

module.exports.edit_cart = async (req, res) => {
  res.send("cart update");
};
