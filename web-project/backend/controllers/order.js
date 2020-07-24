const Order = require('../models/order');

exports.place = (req, res, next) => {
  const order = new Order({
    date: req.body.date,
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    mobile: req.body.mobile,
    streetAdress: req.body.streetAdress,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    pinCode: req.body.pinCode,
    totalPrice: req.body.totalPrice,
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


exports.getCustomerOrders = (req, res, next) => {
  Order.find({customerId: req.params.id}).then(documents => {
    res.status(200).json({
      message: "Orders fetched succesfully",
      orders: documents
    });
  })
  .catch(error => {
    res.status(500).json({
      mesage: "Fetchong ordedrs failed!"
    });
  });
};

exports.update = (req, res, next) => {
  Order.updateOne(
    {_id: req.params.id},
    { $set: { 'totalPrice': req.body.totalPrice} }
    ).then(result => {
      Order.updateOne(
        {_id: req.params.id},
        { $pull: { 'products': { _id : req.body.productId }}}
        ).then(result => {
          res.status(200).json({
            message: "updates Successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "Couldn't update the product"
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update the order"
      });
    });
};

exports.cancelOrder = (req, res, next) => {
  Order.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({
      message: "Product deleted Successfully!"
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't delete the order"
    });
  });
};
