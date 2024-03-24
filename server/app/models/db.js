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

connection.query("SELECT * FROM User", (err, rows) => {
  if (err) {
    console.log("Error in Fetching Data", err);
    return;
  }
  console.log("Data Fetched Successfully", rows);
});

module.exports = connection;
