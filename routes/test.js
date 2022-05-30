const { app } = require("..");
const { verifyJWT } = require("../modules/main");
const Test = require("../models/Tests");

app.post("/test/new", verifyJWT, (req, res) => {
  const userID = req.userID;
  res.json({
    success: true,
  });
});
