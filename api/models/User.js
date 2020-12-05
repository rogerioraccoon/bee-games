const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  addressCep: {
    type: String,
    required: true,
  },
  addressPlace: {
    type: String,
    required: true,
  },
  addressNumber: {
    type: String,
    required: true,
  },
  addressComplement: {
    type: String,
    required: true,
  },
  addressCity: {
    type: String,
    required: true,
  },
  addressState: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Users", UserSchema);
