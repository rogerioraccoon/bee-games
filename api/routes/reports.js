const express = require("express");
const router = express.Router();
const authAdminJWT = require("../lib/authAdmin");
const Transaction = require("../models/Transaction");
const Product = require("../models/Product");

router.get("/sells", authAdminJWT, async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const data = transactions.map((transaction) => {
      const quantity = transaction.items.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
      const total = transaction.items.reduce((acc, item) => {
        return acc + item.quantity * item.price;
      }, 0);
      return {
        date: transaction.date,
        id: transaction._id,
        quantity: quantity,
        total: total,
      };
    });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/sells-product", authAdminJWT, async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const sells = {};
    transactions.forEach((transaction) => {
      transaction.items.forEach((item) => {
        if (!sells[item.sku]) {
          sells[item.sku] = {
            total: item.price * item.quantity,
            quantity: item.quantity,
          };
        } else {
          sells[item.sku].total += item.price * item.quantity;
          sells[item.sku].quantity += item.quantity;
        }
      });
    });
    const products = await Product.find();
    const data = products.map((product) => {
      return {
        "name": product.title,
        "price": product.price,
        "stock": product.stock,
        "quantity": sells[product._id] ? sells[product._id].quantity : 0,
        "total": sells[product._id] ? sells[product._id].total : 0
      }
    })
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
