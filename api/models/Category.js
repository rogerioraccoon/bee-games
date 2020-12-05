const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Categories", CategorySchema);
