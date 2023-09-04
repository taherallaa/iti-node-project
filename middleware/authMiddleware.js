require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");
const handleError = require("../custome-errors/handle-error");

const requireAuth = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (token) {
      jwt.verify(token, process.env.token_secret, async (err, decoded) => {
        if (err) {
          res.json({
            status: 401,
            message: "you don't have an account,singup ",
          });
        } else {
          if (decoded.role === "admin") {
            next();
          } else {
            res.json({ error: "Only Admin  have  Access to Product" });
          }
        }
      });
    } else {
      res.json({ status: 401, message: "you don't have an account, signup " });
    }
  } catch (err) {
    const errors = handleError(err);
    res.send(errors);
  }
};

const cartAuth = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (token) {
      jwt.verify(token, process.env.token_secret, async (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({
            status: 401,
            message: "you don't have an account, signup ",
          });
        } else {
          if (decoded.role === "user") {
            next();
          } else {
            res.json({ error: "Only Users have  Access to Cart" });
          }
        }
      });
    } else {
      res.json({ status: 401, message: "you don't have an account, signup " });
    }
  } catch (err) {
    console.log("taher");
    const errors = handleError(err);
    res.send(errors);
  }
};

const orderAuth = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (token) {
      jwt.verify(token, process.env.token_secret, async (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({
            status: 401,
            message: "you don't have an account, signup ",
          });
        } else {
          if (decoded.role === "user") {
            next();
          } else {
            res.json({ error: "Only Users have  Access to order" });
          }
        }
      });
    } else {
      res.json({ status: 401, message: "you don't have an account, signup " });
    }
  } catch (err) {
    console.log("taher");
    const errors = handleError(err);
    res.send(errors);
  }
};

module.exports = { requireAuth, cartAuth, orderAuth };
