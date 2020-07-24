const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserRetailer = require("../models/user_retailer");
const UserCustomer = require("../models/user_customer");
const UserAdmin = require("../models/user_admin");

exports.createUserRetailer = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const userRetailer = new UserRetailer({
        fullName: req.body.fullName,
        shopName: req.body.shopName,
        mobile: req.body.mobile,
        email: req.body.email,
        password: hash
      });
      userRetailer.save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
              message: "Invalid authentication credentials!"
          });
        });
    });
};

exports.createUserCustomer = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const userCustomer = new UserCustomer({
        fullName: req.body.fullName,
        mobile: req.body.mobile,
        email: req.body.email,
        password: hash,
        streetAdress: req.body.streetAdress,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pinCode: req.body.pinCode
      });
      userCustomer.save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
              message: "Invalid authentication credentials!"
          });
        });
    });
};

exports.loginRetailer = (req, res, next) => {
  let fetchedUser;
  UserRetailer.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: "Invalid authentication credentials!"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "Divyanhu Abhimanyu",
        {expiresIn: "1h"}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        userName: fetchedUser.fullName,
        shopName: fetchedUser.shopName
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth Failed"
      });
    });
};

exports.loginCustomer = (req, res, next) => {
  let fetchedUser;
  UserCustomer.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: "Invalid authentication credentials!"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "Divyanhu Abhimanyu",
        {expiresIn: "1h"}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        userName: fetchedUser.fullName,
        mobile: fetchedUser.mobile,
        streetAdress: fetchedUser.streetAdress,
        city: fetchedUser.city,
        state: fetchedUser.state,
        country: fetchedUser.country,
        pinCode: fetchedUser.pinCode
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth Failed"
      });
    });
};

exports.loginAdmin = (req, res, next) => {
  let fetchedUser;
  UserAdmin.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        res.status(401).json({
          message: "Invalid authentication credentials!"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result) {
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "Divyanhu Abhimanyu",
        {expiresIn: "4h"}
      );
      res.status(200).json({
        token: token,
        expiresIn: 14400,
        userName: fetchedUser.fullName
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth Failed"
      });
    });
};
