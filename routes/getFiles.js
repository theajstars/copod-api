const { app } = require("..");
const DataFull = require("../assets/COPOD_Sets/DataFull.json");
const topHalf = require("../assets/COPOD_Sets/topHalf.json");
const bottomHalf = require("../assets/COPOD_Sets/bottomHalf.json");
const testBottom575 = require("../assets/COPOD_Sets/testBottom575.json");
const trainBottom2000 = require("../assets/COPOD_Sets/trainBottom2000.json");
const testTop575 = require("../assets/COPOD_Sets/testTop575.json");
const trainTop2000 = require("../assets/COPOD_Sets/trainTop2000.json");

const newDataSets = {
  topHalf: require("../assets/COPOD_Sets/Israeli_Datasets/df500000.json"),
  bottomHalf: require("../assets/COPOD_Sets/Israeli_Datasets/dfbottom500000.json")
};
console.log(newDataSets.topHalf.length);
app.get("/datasets/bottomhalf", (req, res) => {
  res.json({
    file: bottomHalf,
  });
});
app.get("/datasets/bottom575", (req, res) => {
  res.json({
    file: testBottom575,
  });
});
app.get("/datasets/bottom2000", (req, res) => {
  res.json({
    file: trainBottom2000,
  });
});
app.get("/datasets/tophalf", (req, res) => {
  res.json({
    file: topHalf,
  });
});
app.get("/datasets/top575", (req, res) => {
  res.json({
    file: testTop575,
  });
});
app.get("/datasets/top2000", (req, res) => {
  res.json({
    file: trainTop2000,
  });
});
app.get("/datasets/new/tophalf", (req, res) => {
  res.json({
    file: newDataSets.topHalf,
  });
});
app.get("/datasets/new/bottomhalf", (req, res) => {
  res.json({
    file: newDataSets.bottomHalf,
  });
});
