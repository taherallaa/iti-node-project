const mongoose = require("mongoose");

const userSchema = require("../schemas/user-schema");

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
