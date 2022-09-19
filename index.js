require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { verifyJWT } = require("./modules/main");
const uri = process.env.mongoDB_URI;
const port = process.env.PORT || 8080;

app.use(
  cors({
    // origin: ["http://localhost:3000"],
    // origin: ["https://copodtwo.netlify.app", "https://copod.software"],
    origin: ["https://www.copod.software"],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Connected successfully!",
    connected: true,
  });
});
//Check if user is authenticated or not
app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.json({
    auth: true,
  });
});
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected", true),
      app.listen(port, () => {
        console.log(`Server started on ${port}`);
      });
  });

module.exports = {
  app: app,
};
require("./routes/auth");
require("./routes/getFiles");
require("./routes/getModels");
require("./routes/test");
require("./routes/developerMessage");
