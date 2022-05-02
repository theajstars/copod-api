require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const uri = process.env.mongoDB_URI;

app.use(
  cors({
    origin: ["http://127.0.0.1:5500"],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({
    message: "Connected successfully!",
    connected: true,
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
