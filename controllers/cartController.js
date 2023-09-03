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
    let prodPrice = product.price;

    product.quntity = productQuntity;
    product.save();

    if (!product) {
      res.send("product not found");
      return;
    }
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
        price += prod.price * prod.quntity;
        if (prod._id == productId) exist = true;
      });

      if (exist) {
        res.send("this product is already add");
      } else {
        existingCart.products.forEach((prod) => {
          price += prod.price * prod.quntity;
        });
        console.log(price);
        /// add new product to the product array
        existingCart.products.push(product);

        /// update total price of chart...
        existingCart.totalPrice = price;

        existingCart.save();
        res.json(product);
      }
    } else {
      console.log("iam on last else");
      const cart = await cartModel.create({
        _id: userId,
        products: product,
        totalPrice: prodPrice * productQuntity,
        productQuntity,
      });
      res.json(cart);
    }
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.send(errors);
  }
};

module.exports.show_all_carts = async (req, res) => {
  await cartModel
    .find()
    .then((carts) => {
      res.json(carts);
    })
    .catch((err) => res.send(err));

  console.log("ok");
};

module.exports.show_my_cart = async (req, res) => {
  const { authorization: readToken } = req.headers;
  const readTokenWithBearer = req.headers.authorization.split(" ")[1];

  const token = readTokenWithBearer ?? readToken;

  const userId = jwt.verify(token, process.env.token_secret).id;

  await cartModel
    .findById(userId)
    .then((cart) => {
      res.json(cart);
    })
    .catch((error) => {
      res.send(error);
    });
};

module.exports.edit_cart = async (req, res) => {
  res.send("cart update");
};
