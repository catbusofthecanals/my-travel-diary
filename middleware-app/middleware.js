let jwt = require("jsonwebtoken");

// middleware to check if token is attached
function checkJWTToken(req, res, next) {
  if (req.headers.token) {
    let token = req.headers.token;
    jwt.verify(token, "secretKey", function (error, data) {
      // if invalid token send error message
      if (error) {
        res.send({ message: "Invalid Token" });
      }
      // if so then proceed
      else {
        req.username = data.username;
        req.password = data.password;
        next();
      }
    });
  }
  // else send token missing error message
  else {
    res.send({ message: "No token attached to the request" });
  }
}

module.exports = {
  checkJWTToken,
};
