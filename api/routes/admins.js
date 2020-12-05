const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const authAdminJWT = require("../lib/authAdmin");

router.get("/", authAdminJWT, async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/:adminId", authAdminJWT, async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const admin = await Admin.findById(adminId);
    res.json(admin);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/", authAdminJWT, async (req, res) => {
  const admin = new Admin(req.body);

  try {
    const savedAdmin = await admin.save();
    res.json(savedAdmin);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/:adminId", authAdminJWT, async (req, res) => {
  const adminId = req.params.adminId;

  try {
    const updatedAdmin = await Admin.updateOne(
      { _id: adminId },
      {
        $set: req.body,
      }
    );
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({
      email: req.body.email,
      password: req.body.password,
      active: true,
    });
    if (admin) {
      const access_token = jwt.sign(
        {
          type: "admin",
          id: admin._id,
          name: admin.name,
        },
        process.env.SECRET
      );
      res.json({
        access_token,
        type: "admin",
        name: admin.name,
        id: admin._id,
      });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
