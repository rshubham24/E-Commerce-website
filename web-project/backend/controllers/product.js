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

exports.delete = (req, res, next) => {
  Product.deleteOne({_id: req.params.id}).then(result => {
    if(result.n > 0){
      res.status(200).json({
        meassage: "Product Deleted"
      });
    }
    else{
      res.status(401).json({
        message: "Not authorized!"
      });
    }
  })
}

exports.getProduct = (req, res, next) => {
  Product.findOne({_id: req.params.id}).then(documents => {
    res.status(200).json(documents);
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching Product Failed"
    });
  });
};

exports.updateProduct = (req, res, next) => {
  const product = new Product({
    _id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    retailerId: req.body.retailerId,
    shopName: req.body.shopName
  });
  Product.updateOne({_id: req.params.id}, product).then(result => {
    res.status(200).json({
      message: "updated Successfully"
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update the product"
    });
  });
};
