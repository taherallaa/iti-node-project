require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");

const handleError = (err) => {
  const errors = {
    email: "vaild",
    phonenumber: "vaild",
  };

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

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.token_secret);
};

const autorized = (req, res, next) => {
  console.log("taher");
  next();
};

module.exports.user_signup = async (req, res) => {
  const { username, email, password, phonenumber, address, role } = req.body;

  try {
    const newUser = await userModel.create({
      username,
      email,
      password,
      phonenumber,
      address,
      role,
    });

    const token = createToken(newUser._id, role);
    res.json({ newUser, token });
  } catch (err) {
    const errors = handleError(err);
    res.send(errors);
  }
};

module.exports.user_login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ username, email });
    res.json({ user });
  } catch (err) {
    const errors = handleError(err);
    res.joson({ errors });
  }
};
