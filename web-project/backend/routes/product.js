const express = require("express");

const router = express.Router();
const ProductController = require("../controllers/product");

router.get("/get_products", ProductController.getProducts);
router.get("/get_products_list/:id", ProductController.getProductsList);


module.exports = router;
