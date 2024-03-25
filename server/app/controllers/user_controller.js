const User = require("../models/user.model.js");
const connection = require("../models/db.js");
const jwt = require("jsonwebtoken");
// Function to fetch user data
const fetchUserData = (req, res) => {
  connection.query("SELECT * FROM User", (err, result) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send({ message: "Error occurred while fetching data" });
      return;
    }
    console.log("Fetched data successfully");
    return res.status(200).send({
      success: true,
      data: result,
    });
  });
};

const create = (req, res) => {
  console.log(req.body);
  const userData = [req.body.name, req.body.email, req.body.password];

  console.log("userData", userData);

  connection.query(
    "SELECT * FROM User WHERE email = ?",
    req.body.email,
    (err, data) => {
      if (err) {
        console.log("error: ", err);
        return res.status(500).send(err);
      }
      if (data.length > 0) {
        return res.status(400).send({ message: "User already exists" });
      }

      const sql = "INSERT INTO User (name, email, password) VALUES (?)";
      connection.query(sql, [userData], (err, data) => {
        if (err) {
          console.log("error: ", err);
          return res.status(500).send(err);
        }

        console.log("created user: ", data);
        return res.status(200).send({ success: true, data: data });
      });
    }
  );
};

const loginController = (req, res) => {
  const sql = "SELECT * FROM User WHERE `email` = ? AND `password` = ?";
  const values = [req.body.email, req.body.password];

  connection.query(sql, values, (err, data) => {
    if (err) {
      console.log("error: ", err);
      return res.status(500).send({
        success: false,
        message: "Error occurred while fetching data",
      });
    }
    if (data.length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid email or password" });
    }
    const email = data[0].email;
    const name = data[0].name;
    const id = data[0].id;
    const token = jwt.sign(
      {
        email: email,
        name: name,
        id: id,
      },
      "my_secret_key",
      {
        expiresIn: "24h",
      }
    );
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).send({ success: true, data: data });
  });
};

const saveScore = (req, res) => {
  const { score, shapeType, shapeColor } = req.body;
  const userId = req.user.id;
  console.log("Req from cookie", req.user);
  console.log("Req from body", req.body);

  const sql =
    "INSERT INTO scores (user_id, score, shape_type, shape_color) VALUES (?, ?, ?, ?)";
  const values = [userId, score, shapeType, shapeColor];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error saving score:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error occurred while saving score" });
    }

    console.log("Score saved successfully");
    return res
      .status(200)
      .json({ success: true, message: "Score saved successfully" });
  });
};

const getLeaderboard = (req, res) => {
  console.log("Req from cookie", req.query);
  const { timeWindow } = req.query;

  // Calculate the start time based on the selected time window
  const startTime = calculateStartTime(timeWindow);

  // Query to fetch leaderboard data with user names and adjusted points
  const sql = `
    SELECT 
      u.*, 
      SUM(IF(s.shape_type = 'triangle' AND s.shape_color = 'blue', 10, 0)) AS points
    FROM User u
    LEFT JOIN scores s ON u.id = s.user_id
    GROUP BY u.id 
    HAVING points > 0
    ORDER BY points DESC
  `;

  connection.query(sql, [startTime], (err, rows) => {
    if (err) {
      console.error("Error fetching leaderboard data:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error fetching leaderboard data" });
    }
    console.log(rows);
    // Send the leaderboard data to the client
    return res.status(200).json({ success: true, leaderboard: rows });
  });
};

// Function to calculate the start time based on the selected time window
function calculateStartTime(timeWindow) {
  const currentTime = new Date();
  switch (timeWindow) {
    case "5min":
      return new Date(currentTime.getTime() - 5 * 60 * 1000); // 5 minutes ago
    case "10min":
      return new Date(currentTime.getTime() - 10 * 60 * 1000); // 10 minutes ago
    case "30min":
      return new Date(currentTime.getTime() - 30 * 60 * 1000); // 30 minutes ago
    case "1hr":
      return new Date(currentTime.getTime() - 60 * 60 * 1000); // 1 hour ago
    default:
      return new Date(0); // Default to epoch time (start from the beginning)
  }
}

module.exports = {
  fetchUserData,
  create,
  User,
  loginController,
  saveScore,
  getLeaderboard,
};
