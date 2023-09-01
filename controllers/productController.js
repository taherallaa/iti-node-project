require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const handleError = require("../custome-errors/handle-error");

/*
const handleError = (err) => {
  const errors = {};

  if (err.code === 11000) {
    Object.values(err).forEach((item) => {
      if (typeof item === "object") {
        errors[Object.keys(item)] = "must be unique";
      }
    });
  }

  if (
    err.message.includes("admin validation failed") ||
    err.message.includes("user validation failed")
  ) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
*/

module.exports.add_product = async (req, res) => {
  try {
    const { productName, price, description } = req.body;

    const newProduct = await productModel.create({
      productName,
      price,
      description,
    });
    res.json({ newProduct });
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.send(errors);
  }
};

module.exports.edit_product = async (req, res) => {
  try {
    const id = req.params.id;
    const { productName, price, description } = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(id, {
      productName,
      price,
      description,
    });
    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.send(errors);
  }
};

module.exports.show_products = async (req, res) => {
  await productModel
    .findOne()
    .then((products) => {
      if (products) {
        res.json(products);
      } else {
        res.json({ message: "there are not products" });
      }
    })
    .catch((error) => {
      res.json(error);
    });
};

module.exports.show_one_product = async (req, res) => {
  const id = req.params.id;

  await productModel
    .findById(id)
    .then((product) => {
      res.json(product);
    })
    .catch(() => {
      res.json({ message: "product not founded" });
    });
};

module.exports.delete_one_product = async (req, res) => {
  const id = req.params.id;
  await productModel
    .findByIdAndDelete(id)
    .then((product) => {
      res.json(product);
    })
    .catch(() => {
      res.json({ message: "product not founded" });
    });
};

module.exports.delete_products = async (req, res) => {
  await productModel
    .deleteMany()
    .then((product) => {
      res.json(product);
    })
    .catch(() => {
      res.json({ message: "product not founded" });
    });
};

module.exports.add_to_cart = async (req, res) => {
  // check if user add the product to cart again [notice him or increase]
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    console.log(product);
    const { productQuntity } = req.body;

    if (!product) res.json({ error: "this product no valid" });

    const cart = await cartModel.create({
      _id: id,
      product,
      productQuntity,
    });
    res.json(cart);
  } catch (err) {
    const errors = handleError(err);
    res.send(errors);
  }
};
