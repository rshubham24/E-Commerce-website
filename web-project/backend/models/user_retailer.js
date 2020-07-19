const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userRetailerSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  shopName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true , unique: true},
  password: { type: String, required: true }
});

userRetailerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserRetailer", userRetailerSchema);
