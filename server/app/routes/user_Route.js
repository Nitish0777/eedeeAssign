const express = require("express");
const User = require("../controllers/user_controller");

const router = express.Router();

router.get("/getData", User.fetchUserData);

// Create a Signup Route
router.post("/register", User.create);

module.exports = router;
