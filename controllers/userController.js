require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");
const handleError = require("../custome-errors/handle-error");

const createToken = (id, userName, role) => {
  return jwt.sign({ id, userName, role }, process.env.token_secret);
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

    const token = createToken(newUser._id, username, role);
    res.json({ newUser, token });
  } catch (err) {
    const errors = handleError(err);
    res.send(errors);
  }
};

module.exports.user_login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ username, email }).select("-__v ");
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user.id, username, user.role);
      res.json({ user, token });
    } else {
      res.json({ message: "invalid email or password" });
    }
  } catch (err) {
    const errors = handleError(err);
    res.json({ errors });
  }
};

module.exports.get_users = async (req, res) => {
  //const users = await userModel.find({ role: "user" });
  const users = await userModel.find();
  if (users) {
    res.json({ users });
  } else {
    res.json({ message: "there is not user" });
  }
};

module.exports.get_one_user = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findById(id);
  res.json(user);
  console.log("taher id ", id);
};

module.exports.delete_one_user = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if (user) {
      res.json({ user });
    } else {
      res.json({ user: "this use not found " });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.delete_users = async (req, res) => {
  try {
    const users = await userModel.deleteMany({ role: "user" });
    if (users) {
      res.send("users is delete");
    } else {
      res.send("there are not users");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.edit_user = async (req, res) => {
  try {
    const { username, email, password, phonenumber, address, role } = req.body;
    const id = req.params.id;
    const checkedUser = await userModel.findById(id);
    console.log(Boolean(checkedUser));
    if (checkedUser) {
      try {
        const updatedUser = await userModel.findByIdAndUpdate(id, {
          username,
          email,
          password,
          phonenumber,
          address,
          role,
        });
        res.send("user updated");
      } catch (err) {
        const errors = handleError(err);
        res.send(errors);
      }
    } else {
      res.json({ error: "this user not found" });
    }
  } catch (err) {
    console.log(err);
  }
};
