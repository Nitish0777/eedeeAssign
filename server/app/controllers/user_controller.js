// Path: server/app/controllers/user_controller.js

const User = require("../models/user.model.js");
const connection = require("../models/db.js");

User.create = (newUser, result) => {
  const userData = {
    name: newUser.name,
    username: newUser.username,
    password: newUser.password,
  };

  console.log("userData", userData);

  connection.query("INSERT INTO User SET ?", userData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...userData });
    result(null, { id: res.insertId, ...userData });
  });
};

module.exports = User;
