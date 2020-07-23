const Order = require('../models/order');

exports.place = (req, res, next) => {
  const order = new Order({
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    mobile: req.body.mobile,
    streetAdress: req.body.streetAdress,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    pinCode: req.body.pinCode,
    products: req.body.products
  });
  console.log(order);
  console.log("hi");
  order.save()
    .then(result => {
      res.status(201).json({
        message: 'Order Added',
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Order Not Added'
      });
    });
};
