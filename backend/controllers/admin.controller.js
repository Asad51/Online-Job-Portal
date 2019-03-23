const jwt = require('jsonwebtoken');

let Admin = require('../models/admin.model');
const crypto = require("../libs/data-encryption");
let secretKeys = require("../config/secret.key");

module.exports = {
  addAdmin: async (req, res, next) => {
    if (Object.keys(req.body).length > 4) {
      res.status(400).send({
        error: "Invalid data format."
      });
    }

    let password = req.body.password;
    req.checkBody("name", "Name is required.").notEmpty();
    req.checkBody("name", "Name must be at 4 characters long.").isLength({
      min: 4
    });
    req.checkBody("email", "Email is required.").notEmpty();
    req.checkBody("email", "Enter valid email.").isEmail();
    req.checkBody("password", "Password is required.").notEmpty();
    req.checkBody("password", "Password must be 6 character long.").isLength({
      min: 6
    });
    req.checkBody("confirmPassword", "Please retype password.").notEmpty();
    req
      .checkBody("confirmPassword", "Please confirm password.")
      .equals(password);

    let errors = req.validationErrors();
    if (errors) {
      return res.status(422).send(errors);
    }

    let email = crypto.encrypt(req.body.email, secretKeys.adminEmailKey, secretKeys.adminEmailIV);
    let admin = await Admin.findOne({
      email: email
    }, "email");
    if (admin) {
      return res.status(400).send({
        error: "Email is already used."
      });
    }

    let newAdmin = new Admin({
      name: req.body.name,
      email: email,
      password: crypto.encrypt(password, secretKeys.adminPasswordKey)
    });

    newAdmin.save(newAdmin, (err, admin) => {
      if (err) {
        return res.status(500).send({
          error: "Server Error."
        });
      }
      res.status(201).send({
        success: "Admin added successfully."
      });
    });
  },

  login: async (req, res, next) => {
    if (Object.keys(req.body).length !== 2) {
      return res.status(401).send({
        error: ['Invalid Data Format']
      });
    }

    req.checkBody('email', 'Not a valid email.').isEmail();
    req.checkBody('password', 'Password can not be empty.').notEmpty();

    if (req.validationErrors()) {
      return res.status(401).send({
        error: req.validationErrors()
      });
    }

    let email = crypto.encrypt(req.body.email.toLowerCase(), secretKeys.adminEmailKey, secretKeys.adminEmailIV);

    let admin = await Admin.findOne({
      email: email
    }, "name email password");

    if (!admin || req.body.password != crypto.decrypt(admin.password, secretKeys.adminPasswordKey)) {
      return res.status(401).send({
        error: ['Incorrect email or password.']
      });
    }

    jwt.sign({
      id: admin._id,
      name: admin.name
    }, secretKeys.jwt, {
      algorithm: 'HS256',
      expiresIn: '30d'
    }, (err, token) => {
      if (err) {
        res.status(500).send({
          error: 'Server Error.'
        });
      } else {
        res.status(200).json({
          success: "Login Successful.",
          token: token
        });
      }
    });
  },

  logout: (req, res, next) => {
    res.status(200).send({
      success: 'You are successfully logged out.'
    });
  }
}
