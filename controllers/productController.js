require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const productModel = require("../models/productModel");

// handle error

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
