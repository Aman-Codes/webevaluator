const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
  });
});

module.exports = router;
