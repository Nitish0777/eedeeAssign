const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "eedee",
});

connection.connect((err) => {
  if (err) {
    console.log("Error in Connecting to Database", err);
    return;
  }
  console.log("Connected to Database");
});

module.exports = connection;
