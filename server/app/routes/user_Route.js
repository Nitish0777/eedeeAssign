const express = require("express");

const router = express.Router();

// Create a Signup Route
router.post("/signup", (req, res) => {
  res.send("Signup Route");
});

module.exports = router;
