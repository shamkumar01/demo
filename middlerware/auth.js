// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const authentication = async (req, res, next) => {
//   console.log(process.env.JWT_SECRET_KEY);
//   try {
//     const token = req.cookies;
//     console.log("Token", token);
//     const decoded = jwt.verify(token, "qwerty");
//     console.log("dec", decoded);
//     if (!token) {
//       return res.send({ success: false, message: "User is not logged in " });
//     } else if (!decoded) {
//       return res.json({ success: false, message: " Not authenticated" });
//     }
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.send(error.message);
//     console.log(error);
//   }
// };
// module.exports = authentication;

// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const authentication = async (req, res, next) => {
//   const { userId } = req.body;
//   console.log(userId);
//   console.log(process.env.JWT_SECRET_KEY);
//   try {
//     const token = req.cookies.token; // Assuming jwtToken is the name of your JWT cookie
//     console.log("Token", token);
//     if (!token) {
//       return res.send({ success: false, message: "User is not logged in " });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Using the secret from .env
//     console.log("dec", decoded);
//     if (!decoded) {
//       return res.json({ success: false, message: "Not authenticated" });
//     }
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.send(error.message);
//     console.log(error);
//   }
// };
// module.exports = authentication;

const jwt = require("jsonwebtoken");
require("dotenv").config();
const authentication = async (req, res, next) => {
  const { userId } = req.body; // Extract userId from req.body
  console.log("UserId", userId);
  console.log("JWT Secret Key", process.env.JWT_SECRET_KEY);
  try {
    const token = req.cookies.token; // Assuming jwtToken is the name of your JWT cookie
    console.log("Token", token);
    if (!token) {
      return res.send({ success: false, message: "User is not logged in " });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Using the secret from .env
    console.log("dec", decoded);
    if (!decoded) {
      return res.json({ success: false, message: "Not authenticated" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};
module.exports = authentication;
