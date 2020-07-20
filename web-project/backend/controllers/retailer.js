const Product = require("../models/product");

exports.addProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    retailerId: req.body.retailerId,
    shopName: req.body.shopName
  });
  product.save()
    .then(result => {
      res.status(201).json({
        message: 'Product Added!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Product Not Added'
      });
    });
};
