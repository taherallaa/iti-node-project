const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const passwordValidator = require("password-validator");

const validPassword = new passwordValidator()
  .is()
  .min(8, "taher")
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2, "password must have 2 digit")
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    //unique: [true, "this user is uesed"],
    minlength: [6, "Please Enter valid name"],
  },
  email: {
    type: String,
    unique: [true, "Invalid Email"],
    required: [true, "Enter Email"],
    validate: [isEmail, "Invalid Email"],
  },
  password: {
    type: String,
    select: true,
    required: true,
    validate: (value) => {
      console.log(value);
      return validPassword.validate(value);
    },
  },
  phonenumber: {
    type: String,
    required: [true, "Please enter phone number"],
    unique: [true, "this phone number is used"],
    minlength: [8, "enter valid password"],
  },
  address: {
    type: String,
    select: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    select: true,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = userSchema;
