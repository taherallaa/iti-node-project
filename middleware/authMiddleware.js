require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.token_secret, (err, decoded) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
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

module.exports = requireAuth;
