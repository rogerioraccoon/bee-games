const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Product  = require("../models/Product");
const authAdminJWT = require("../lib/authAdmin");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});


router.get("/:categoryId/products", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ category: categoryId });
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/", authAdminJWT, async (req, res) => {
  const category = new Category({
    title: req.body.title
  });

  try {
    const savedCategory = await category.save();
    res.json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/:categoryId", authAdminJWT, async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const updatedCategory = await Category.updateOne(
      { _id: categoryId },
      {
        $set: req.body
      }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
