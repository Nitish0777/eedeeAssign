const express = require("express");
const User = require("../controllers/user_controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("In home page");
});

// Create a Signup Route
router.post("/register", User.create);

module.exports = router;
