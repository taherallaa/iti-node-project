require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const handleError = require("../custome-errors/handle-error");

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
