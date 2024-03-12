// const user = require("../models/user");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "gmail",
  //   host: "smpt.gmail.com",
  port: 587,
  secure: false,
  auth: { user: process.env.USER_EMAIL, pass: process.env.EMAIL_PASSWORD },
});

// funtion for genreating otp
const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact, gender } = req.body;
    if ((!name, !email, !password, !contact, !gender)) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "email is already in used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
      contact,
      otp,
      gender,
    });

    const info = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "verify your otp",
      text: `your otp is ${otp}`,
    };
    const savedUser = await newUser.save();
    await transport.sendMail(info);
    res.status(200).json({
      success: true,
      message: "Sign up successfull .Please verify your account with otp",
      savedUser: savedUser,
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(`otp is ${otp}`);
    let users = await user.findOne({ email });
    if (!users) {
      return res
        .status(400)
        .json({ success: false, message: "Email not found" });
    }
    if (users.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid otp" });
    }
    users.isVerified = true;
    users.otp = null;
    await users.save();
    res.status(200).json({
      success: true,
      message: "account verified",
    });
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await user.findOne({ email });
    if (!users) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    const isMatchedpass = await bcrypt.compare(password, users.password);
    if (!isMatchedpass) {
      return res
        .status(400)
        .json({ success: false, message: "incorrect password" });
    }
    const token = await jwt.sign(
      { userId: users._id },
      process.env.JWT_SECRET_KEY
    );
    users.token = token;
    const savedUser = await users.save();
    res.cookie("token", token, {
      expire: new Date(Date.now() * 99999), // cookie will be removed after 9
      httponly: true,
    });
    res
      .status(200)
      .json({ success: true, message: "user loggedin", user: savedUser });
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};
//   logout functon
const logOut = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorised access" });
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (decoded) {
    const users = await user.findById(decoded.userId);
    users.token = null;
    await users.save;
    res.clearCookie("token");
    res.json({ success: true, message: "Logged out" });
  }
};

module.exports = { registerUser, loginUser, verifyOtp, logOut };
