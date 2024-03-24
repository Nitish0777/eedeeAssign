// Path: server/app/models/user.model.js

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
};

module.exports = User;
