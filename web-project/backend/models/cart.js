const mongoose = require('mongoose');
const { stringify } = require('querystring');

const cartSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true},
  imageUrl: { type: String, required: true },
  retailerId: { type: String, required: true },
  shopName: { type: String, required: true },
  productId: { type: String, required: true },
  customerId: { type: String, required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model("Cart", cartSchema);
