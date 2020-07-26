const express = require("express");

const OrderController = require("../controllers/order");
const router = express.Router();

router.post("/place", OrderController.place);
router.get("/get_customer_orders/:id", OrderController.getCustomerOrders);
router.put("/update/:id", OrderController.update);
router.delete("/delete/:id", OrderController.cancelOrder);
router.get("/get_all_orders", OrderController.getAllOrders);

module.exports = router;
