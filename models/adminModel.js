const mongoose = require("mongoose");

const userSchema = require("../schemas/user-schema");

const adminModel = mongoose.model("admin", userSchema);

module.exports = adminModel;
