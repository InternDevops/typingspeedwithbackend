const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  username: String,
  wpm: Number,
  accuracy: Number,
  timeTaken: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Result", resultSchema);
