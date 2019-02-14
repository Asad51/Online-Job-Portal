const jwt = require('jsonwebtoken');

const User = require("../models/job-seeker.model");
const crypto = require("../libs/data-encryption");
let secretKeys = require("../config/secret.key");

module.exports = {
  register: async (req, res, next) => {
    if (Object.keys(req.body).length > 5) {
      res.status(400).send({
        error: "Invalid data format."
      });
    }

    let password = req.body.password || "";

    req.checkBody("username", "Username is required.").notEmpty();
    req.checkBody("username", "Username must be at 4 characters long.").isLength({
      min: 4
    });
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

    let user = await User.findOne({
      username: req.body.username
    }, "username");
    if (user) {
      return res.status(400).send({
        error: "Username is already used."
      });
    }

    let email = crypto.encrypt(
      req.body.email.toLowerCase(),
      secretKeys.userEmailKey,
      secretKeys.userEmailIV
    );

    user = await User.findOne({
      email: email
    }, "email");
    if (user) {
      return res.status(400).send({
        error: "Email is used."
      });
    }

    let newUser = new User({
      username: req.body.username,
      name: req.body.name,
      email: email,
      password: crypto.encrypt(password, secretKeys.userPasswordKey)
    });

    newUser.save(newUser, (err, user) => {
      if (err) {
        return res.status(500).send({
          error: "Server Error."
        });
      }
      res.status(201).send({
        success: "Registration successful."
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

    let email = crypto.encrypt(req.body.email.toLowerCase(), secretKeys.userEmailKey, secretKeys.userEmailIV);

    let user = await User.findOne({
      email: email
    }, "name email password");

    if (!user || req.body.password != crypto.decrypt(user.password, secretKeys.userPasswordKey)) {
      return res.status(401).send({
        error: ['Incorrect email or password.']
      });
    }

    jwt.sign({
      id: user._id,
      name: user.name
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
  },

  getProfile: async (req, res, next) => {
    User.findById(res.locals.id, 'username name email', (err, user) => {
      if (err || !user) {
        return res.status(500).send({
          error: "Server Error."
        });
      }

      res.status(200).send({
        username: user.username,
        name: user.name,
        email: crypto.decrypt(user.email, secretKeys.userEmailKey)
      });
    });
  },

  updateProfile: async (req, res, next) => {

  }
};
