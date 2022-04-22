const bcrypt = require("bcrypt");
const { app } = require("..");
const User = require("../models/Users");
const mongoose = require("mongoose");
const uri = process.env.mongoDB_URI;

app.get("/connect", (req, res) => {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
      res.json({
        connected: true,
        message: "Connected Successfully",
        samp: result.version,
      });
    })
    .catch((err) => {
      res.json({
        connected: false,
      });
    });
});
app.post("/user/register", (req, res) => {
  const { name, email, password } = req.body;
  //   Check if user already exists
  User.findOne(
    {
      email: email,
    },
    (err, response) => {
      if (Object.entries(response).length === 0) {
        //User already exists
        res.json({
          userExists: true,
        });
      } else {
        // User does not exist so create user
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            res.json({
              hash: "fail",
            });
            throw err;
          } else {
            bcrypt.hash(password, salt, (err, hash) => {
              console.log("The password hash: ", hash);
              const user = new User({
                name: name,
                email: email,
                password: hash,
              });
              user.save();
              res.json({
                hash: "successful",
                body: hash,
              });
            });
          }
        });
      }
    }
  );
});

app.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  //Find if email exists in DB
});
