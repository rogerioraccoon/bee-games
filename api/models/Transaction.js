const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});


const TransactionSchema = mongoose.Schema({
    items: {
      type: [ItemSchema],
      required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Transactions", TransactionSchema);
