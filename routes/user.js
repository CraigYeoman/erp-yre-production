const express = require("express");
const router = express.Router();

const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // number of request per time limit
  message:
    "Too many request from this IP address, please try again in 15 minutes",
});

const {
  register,
  login,
  updateUser,
} = require("../controllers/userController");
const authenticateUser = require("../middleware/auth");

// POST request for registering a User.
router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("./update").patch(authenticateUser, updateUser);

module.exports = router;
