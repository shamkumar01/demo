const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: String,
  isVerified: { type: Boolean, default: false },
  contact: { type: Number, required: true },
  gender: { type: String, required: true },
  token: String,
});

const user = new mongoose.model("user", userSchema);
module.exports = user;
