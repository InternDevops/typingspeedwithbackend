const express = require("express");
const router = express.Router();
const { submitResult, getResults } = require("../controllers/resultController");

router.post("/", submitResult);
router.get("/", getResults);

module.exports = router;
