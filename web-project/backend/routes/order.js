const express = require("express");

const OrderController = require("../controllers/order");
const router = express.Router();

router.post("/place", OrderController.place);

module.exports = router;
