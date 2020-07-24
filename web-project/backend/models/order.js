const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  date: { type: Number, required: true },
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  mobile: { type: String, required: true },
  streetAdress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: {type: String, required: true},
  pinCode: {type: Number, required: true},
  totalPrice: {type: Number, required: true},
  products: [{
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true},
    imageUrl: { type: String, required: true },
    retailerId: { type: String, required: true },
    shopName: { type: String, required: true },
    productId: { type: String, required: true },
    customerId: { type: String, required: true },
    quantity: { type: Number, required: true },
    id: {type: String, required: true}
  }],
});

module.exports = mongoose.model("Order", orderSchema);
