const express = require("express");
const CartController = require("../controllers/cart");

const router = express.Router();

router.post("/add", CartController.addToCart);
router.get("/get_cart_item/:id", CartController.getItem);
router.delete("/delete/:id", CartController.deleteItem);
router.delete("/delete_all/:id", CartController.deleteAllItem);
router.put("/update/:id", CartController.updateItem);

module.exports = router;
