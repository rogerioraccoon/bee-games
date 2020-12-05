const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authAdminJWT = require("../lib/authAdmin");
const multer = require("multer");
const multerConfig = require("../configs/multer");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post(
  "/",
  authAdminJWT,
  multer(multerConfig).single("file"),
  async (req, res) => {
    const product = new Product({
      ...req.body,
      image: `/uploads/${req.file.filename}`,
    });

    try {
      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
);

router.patch("/:productId", authAdminJWT, async (req, res) => {
  const productId = req.params.productId;

  try {
    const updatedProduct = await Product.updateOne(
      { _id: productId },
      {
        $set: req.body,
      }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
