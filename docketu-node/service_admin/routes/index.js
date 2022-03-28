const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: "Welcome !" })
});

router.post('/', (req, res, next) => {
  if (!req.body.message || req.body.message == "" || typeof req.body.message == undefined) {
    return res.status(400).json("Missing message var in body")
  }
  res.json({ message: req.body.message });//hello world!
});

module.exports = router;
