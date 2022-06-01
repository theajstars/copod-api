const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  testID: {
    type: String,
    required: true,
  },
  testObject: {
    type: Object,
    required: true,
  },
  verdict: {
    type: String,
    required: true,
  },
  userVerdict: {
    type: String,
    required: false,
  },
  testResult: {
    type: Array,
    required: true,
  },
});

const Test = mongoose.model("Test", TestSchema);
module.exports = Test;
