const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.find().then(documents => {
    res.status(200).json({
      message: "Products Fetched Successfully",
      products: documents
    });
  });
};

exports.getProductsList = (req, res, next) => {
  Product.find({retailerId: req.params.id}).then(documents => {
    res.status(200).json({
      message: "Products fetched successfully",
      products: documents
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching products failed!"
    });
  });
};
