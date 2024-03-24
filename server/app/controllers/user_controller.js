const User = require("../models/user.model.js");
const connection = require("../models/db.js");

// Function to fetch user data
const fetchUserData = (req, res) => {
  connection.query("SELECT * FROM User", (err, result) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send({ message: "Error occurred while fetching data" });
      return;
    }
    console.log("Fetched data successfully");
    return res.status(200).send(result);
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
        return res.status(200).send(data);
      });
    }
  );
};

module.exports = { fetchUserData, create, User };
