const jwt = require("jsonwebtoken");
const jwtSecret = process.env.secret;

const signJWT = (userID) => {
  const token = jwt.sign({ userID }, jwtSecret, {
    expiresIn: 72000,
  });
  return token;
};
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
        req.userID = decoded.userID;
        next();
      }
    });
  }
};
module.exports = {
  verifyJWT: verifyJWT,
  signJWT: signJWT,
};
