const express = require("express");
const router = express.Router();

let tokens = [];

router.post("/", (req, res) => {
  const { token } = req.body;

  if (!tokens.includes(token)) {
    tokens.push(token);
  }

  res.json({
    success: true,
  });
});

module.exports = router;