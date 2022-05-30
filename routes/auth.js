const bcrypt = require("bcrypt");
const { app } = require("..");
const User = require("../models/Users");
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
  console.log(req.body);
  //Find if email exists in DB
  User.findOne({ email: email }, (err, response) => {
    console.log(response);
    if (response === null) {
      //Record not found
      console.log("Not found!");
    } else {
      //Check if password matches
      const passwordHash = response.password;
      bcrypt.compare(password, passwordHash, (err, doesPasswordMatch) => {
        if (err) {
          res.json({
            auth: false,
            message: "An error occurred!",
          });
        } else {
          if (doesPasswordMatch) {
            //Password is correct get user id and create jwt
            const userID = response.userID;
            const token = signJWT(userID);
            console.log(token);
            res.json({
              auth: true,
              token: token,
            });
          } else {
            res.json({
              auth: false,
            });
          }
        }
      });
    }
  });
});
