const express = require("express");

const router = express.Router();
const UserController = require("../controllers/user");

router.post("/signup_retailer", UserController.createUserRetailer);
router.post("/signup_customer", UserController.createUserCustomer);
router.post("/login_retailer", UserController.loginRetailer);
router.post("/login_customer", UserController.loginCustomer);
router.post("/login_admin", UserController.loginAdmin);

module.exports = router;
