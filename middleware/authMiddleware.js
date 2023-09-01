require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

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

const checkUserForProduct = (req, res, next) => {
  const token =
    req.headers.authorization.split(" ")[1] ?? req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.token_secret, async (err, decoded) => {
      if (err) {
        console.log(err);
        next();
      } else {
        console.log(decoded);
        const user = await userModel.findById(decoded.id);
        next();
      }
    });
  } else {
    next();
  }
};

module.exports = { requireAuth, checkUserForProduct };
