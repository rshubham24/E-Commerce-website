const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userAdminSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true , unique: true},
  password: { type: String, required: true }
});

userAdminSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserAdmin", userAdminSchema);
