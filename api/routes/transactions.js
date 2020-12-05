const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const jwt = require("jsonwebtoken");
const authClientJWT = require("../lib/authClient");

router.post("/", authClientJWT, async (req, res) => {
  const user = req.user;
  const transaction = new Transaction({ ...req.body, user: user.id });

  try {
    const savedTransaction = await transaction.save();
    res.json(savedTransaction);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/", authClientJWT, async (req, res) => {
  const user = req.user;
  try {
    const transactions = await Transaction.find({ user: user.id });
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
