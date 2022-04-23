const bcrypt = require("bcrypt");
const { app } = require("..");
const User = require("../models/Users");
const mongoose = require("mongoose");
const { signJWT } = require("../modules/main");
const randomString = require("randomstring");

app.post("/user/register", (req, res) => {
  const { name, email, password } = req.body;
  //Check if user already exists
  User.findOne(
    {
      email: email,
    },
    (err, response) => {
      console.log(response);
      if (response !== null) {
        //User already exists
        res.json({
          userExists: true,
          success: false,
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
              //Generate random string for user id with email
              const random = randomString.generate({
                length: 12,
                charset: "alphanumeric",
              });
              const userID = random.concat(email);
              console.log("THe ID: ", userID);
              //Store new user with password hash and userID
              const user = new User({
                userID: userID,
                name: name,
                email: email,
                password: hash,
              });
              user.save();
              const token = signJWT(userID);
              res.json({
                success: true,
                token: token,
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
  User.findOne({ email: email }, (err, response) => {
    if (Object.entries(response).length === 0) {
      // Record not found
      res.json({
        auth: false,
      });
    } else {
      //Check if password matches
    }
  });
});
