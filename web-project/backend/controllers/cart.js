const Cart = require('../models/cart');

exports.addToCart = (req, res, next) => {
  const product = new Cart({
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    retailerId: req.body.retailerId,
    shopName: req.body.shopName,
    productId: req.body.productId,
    customerId: req.body.customerId,
    quantity: req.body.quantity,
  });
  product.save()
    .then(result => {
      console.log(result);
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

exports.getItem = (req, res, next) => {
  Cart.find({customerId: req.params.id}).then(documents => {
    res.status(200).json({
      message: "Products fetched successfully",
      products: documents
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching Products failed!"
    });
  });
};

exports.deleteItem = (req, res, next) => {
  Cart.deleteOne({_id: req.params.id}).then(result => {
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
  });
};

exports.deleteAllItem = (req, res, next) => {
  Cart.deleteMany({customerId: req.params.id}).then(result => {
    if(result.n > 0){
      res.status(200).json({
        message: "Product Deleted"
      });
    }
    else{
      res.status(401).json({
        message: "Not authorized"
      });
    }
  });
};

exports.updateItem = (req, res, next) => {
  const item = new Cart({
    _id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    retailerId: req.body.retailerId,
    shopName: req.body.shopName,
    productId: req.body.productId,
    customerId: req.body.customerId,
    quantity: req.body.quantity
  });
  Cart.updateOne({_id: req.params.id}, item).then(result => {
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
