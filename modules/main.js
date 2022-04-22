const jwt = require("jsonwebtoken");
const jwtSecret = process.env.secret;

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    //User does not send the token
    res.json({
      tokenPresent: false,
      auth: false,
    });
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        //An error occured while verifying the token or token is invalid
        res.json({
          auth: false,
          message: "Failed to authenticate with token!",
        });
      } else {
        req.userID = decoded.id;
        next();
      }
    });
  }
};
module.exports = {
  verifyJWT: verifyJWT,
};
