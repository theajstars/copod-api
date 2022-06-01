const { app } = require("..");
const { verifyJWT } = require("../modules/main");
const Test = require("../models/Tests");
const randomString = require("randomstring");

//Fetch all user tests
app.get("/test/all", verifyJWT, (req, res) => {
  const userID = req.userID;
  Test.find({ userID: userID }, (err, userTests) => {
    if (err) {
      res.json({
        success: false,
      });
      throw err;
    } else {
      res.json({
        userTests,
      });
    }
  });
});

// View specific test
app.post("/test/view", verifyJWT, (req, res) => {
  const userID = req.userID;
  const { testID } = req.body;

  Test.findOne({ testID: testID }, (err, userTestResult) => {
    if (err) {
      res.json({
        success: false,
      });
      throw err;
    } else {
      res.json({
        success: true,
      });
    }
  });
});

// Create a new test
app.post("/test/new", verifyJWT, (req, res) => {
  const userID = req.userID;
  //Generate a new ID for the test
  const random = randomString.generate({
    length: 12,
    charset: "alphanumeric",
  });
  const testID = random.concat(userID);
  const { testObject, verdict, userVerdict, testResult } = req.body;
  const newTest = new Test({
    userID: userID,
    testID: testID,
    testObject: testObject,
    verdict: verdict,
    userVerdict: userVerdict,
    testResult: testResult,
  });
  newTest.save();
  res.json({
    success: true,
  });
});

//Edit a previous test or delete test
app.post("/test/modify", verifyJWT, (req, res) => {
  //Action denotes the action to perform: delete, update test verdict;
  const { testID, action, content } = req.body;
  switch (action) {
    case "delete":
      //Delete user test
      Test.deleteOne({ testID: `${testID}` })
        .then((queryResponse) => {
          console.log("Data deleted: "), queryResponse;
          res.json({
            success: true,
          });
        })
        .catch((err) => {
          console.error("Data could not be deleted: ", err);
          res.json({
            success: false,
          });
        });
      break;
    case "update":
      //Update user verdict for test
      //Content from req.body will contain user verdict
      const query = { testID: testID };
      Test.findOneAndUpdate(
        query,
        { userVerdict: content.userVerdict },
        (queryResponse) => {
          console.log("Query response: ", queryResponse);
          res.json({
            success: true,
          });
        }
      ).catch((err) => {
        console.error(err);
        res.json({
          success: false,
        });
      });
      break;
  }
});
