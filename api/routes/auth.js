const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authClientJWT = require("../lib/authClient");

router.post("/register", async (req, res) => {
  const user = new User(req.body);

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
      active: true
    });
    if (user) {
      const access_token = jwt.sign(
        {
          type: "client",
          id: user._id,
          name: user.name,
        },
        process.env.SECRET
      );
      res.json({
        access_token,
        type: "client",
        name: user.name,
        phone: user.phone,
        id: user._id,
        address: {
          cep: user.addressCep,
          place: user.addressPlace,
          number: user.addressNumber,
          complement: user.addressComplement,
          city: user.addressCity,
          state: user.addressState,
        },
      });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/", authClientJWT, async (req, res) => {
  const user = req.user;
  try {
    const updatedUser = await User.updateOne(
      { _id: user.id },
      {
        $set: req.body,
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/password", authClientJWT, async (req, res) => {
  const user = req.user;
  try {
    const userData = await User.findById(user.id);

    if (req.body.current !== userData.password) {
      res.status(400).json({ message: "Current password is invalid" });
    } else {
      const updatedUser = await User.updateOne(
        { _id: user.id },
        {
          $set: {
            password: req.body.new,
          },
        }
      );
      res.json(updatedUser);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
