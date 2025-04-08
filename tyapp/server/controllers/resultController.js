const Result = require("../models/Result");

const submitResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getResults = async (req, res) => {
  try {
    const results = await Result.find().sort({ wpm: -1 }).limit(10);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { submitResult, getResults };
