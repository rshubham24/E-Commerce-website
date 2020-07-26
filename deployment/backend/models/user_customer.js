const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userCustomerSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true , unique: true},
  password: { type: String, required: true },
  streetAdress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pinCode: { type: Number, required: true }
});

userCustomerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserCustomer", userCustomerSchema);
