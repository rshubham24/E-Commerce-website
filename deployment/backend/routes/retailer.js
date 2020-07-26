const express = require("express");

const router = express.Router();
const RetailerController = require("../controllers/retailer");

router.post("/add_product", RetailerController.addProduct);

module.exports = router;
