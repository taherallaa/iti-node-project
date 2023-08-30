require("dotenv").config();
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const adminModel = require("../models/adminModel");

module.exports.user_signup = async (req, res) => {
  const { username, email, password, phonenumber, address, role } = req.body;

  try {
    if (role === "admin") {
      const newUser = await adminModel.create({
        username,
        email,
        password,
        phonenumber,
        address,
        role,
      });

      res.send(newUser);
    } else {
      const newUser = await userModel.create({
        username,
        email,
        password,
        phonenumber,
        address,
        role,
      });

      res.send(newUser);
    }
  } catch (err) {
    const errors = handleError(err);
    res.send(errors);
  }
};

const handleError = (err) => {
  const errors = {
    email: "valid email",
    phonenumber: "valid phonenumber",
  };

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.token_secret);
};
