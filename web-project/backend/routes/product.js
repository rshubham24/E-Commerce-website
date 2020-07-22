const express = require("express");

const router = express.Router();
const ProductController = require("../controllers/product");

router.get("/get_products", ProductController.getProducts);
router.get("/get_products_list/:id", ProductController.getProductsList);
router.get("/get_product/:id", ProductController.getProduct);
router.delete("/delete/:id", ProductController.delete);
router.put("/update/:id", ProductController.updateProduct);

module.exports = router;
