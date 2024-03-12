const {
  registerUser,
  verifyOtp,
  loginUser,
  logOut,
} = require("../controller/user");

const router = require("express").Router();

router
  .post("/register_user", registerUser)
  .post("/verify_otp", verifyOtp)
  .post("/login_User", loginUser)
  .get("/log_Out", logOut);

module.exports = router;
