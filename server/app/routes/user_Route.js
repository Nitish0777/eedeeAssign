const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("In home page");
});

// Create a Signup Route
router.post("/signup", (req, res) => {
  res.send("Signup Route");
});

module.exports = router;
