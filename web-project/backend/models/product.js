const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true},
  imageUrl: { type: String, required: true },
  retailerId: { type: String, required: true },
  shopName: { type: String, required: true }
});

module.exports = mongoose.model("Product", productSchema);
