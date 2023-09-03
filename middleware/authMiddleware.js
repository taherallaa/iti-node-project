require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.token_secret, (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ status: 401, message: "you don't have an account " });
      } else {
        if (decoded.role === "admin") {
          next();
        } else {
          res.json({ status: 401, message: "you are not admin" });
        }
      }
    });
  } else {
    res.json({ message: "you don't have account. login" });
  }
};

const cartAuth = (req, res, next) => {
  try {
    const { authorization: readToken } = req.headers;
    const readTokenWithBearer = req.headers.authorization.split(" ")[1];

    const token = readTokenWithBearer ?? readToken;

    if (token) {
      jwt.verify(token, process.env.token_secret, async (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({ status: 401, message: "you don't have an account " });
        } else {
          if (decoded.role === "user") {
            next();
          } else {
            res.json({ error: "Only Users have  Access to Cart" });
          }
        }
      });
    } else {
      // console.log(err);
      res.json({ status: 401, message: "you don't have an account, signup " });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { requireAuth, cartAuth };
