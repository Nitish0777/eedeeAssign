const sql = require("./db.js");

// constructor
const User = function (user) {
  this.email = user.email;
  this.name = user.name;
  this.active = user.active;
};
