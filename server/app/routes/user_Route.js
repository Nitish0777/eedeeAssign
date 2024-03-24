const express = require("express");
const User = require("../controllers/user_controller");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/getData", User.fetchUserData);

// Create a Signup Route
router.post("/register", User.create);

//create a login Route
router.post("/login", User.loginController);

router.get("/secure-data", authenticate, (req, res) => {
  res
    .status(200)
    .send({ success: true, message: "Access granted", user: req.user });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .send({ success: true, message: "Logged out successfully" });
});

module.exports = router;
