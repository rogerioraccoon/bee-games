const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const authAdminJWT = require("../lib/authAdmin");

router.get("/", authAdminJWT, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/:userId", authAdminJWT, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/:userId/transactions", authAdminJWT, async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions = await Transaction.find({ user: userId });
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/:userId", authAdminJWT, async (req, res) => {
  const userId = req.params.userId;

  try {
    const updatedUser = await User.updateOne(
      { _id: userId },
      {
        $set: {
          active: req.body.active,
        },
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
