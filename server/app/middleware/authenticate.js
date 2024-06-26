const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  console.log("Cookies: ", req.cookies);
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "my_secret_key");
    req.user = decoded;
    console.log("Decoded user:", decoded);
    next();
  } catch (error) {
    return res
      .status(403)
      .send({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticate;
