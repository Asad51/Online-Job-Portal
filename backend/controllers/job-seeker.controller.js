const jwt = require('jsonwebtoken');

const User = require("../models/job-seeker.model");
const crypto = require("../libs/data-encryption");
let secretKeys = require("../config/secret.key");

function updateJobSeeker(conditions, user, res) {
  User.updateOne(conditions, user, (err, result) => {
    if (err || !result.n) {
      return res.status(500).send({
        error: "Server Error."
      });
    }
    res.status(200).send({
      "success": "Updated successfully."
    });
  });
}

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

  getProfileByUserName: async (req, res, next) => {
    User.findOne({
      username: req.params.username
    }, 'name email fatherName motherName birthDate gender religion maritalStatus nationality nid imageUrl academicInfo experience skills', (err, user) => {
      if (err) {
        return res.status(500).send({
          error: "Server Error."
        });
      }

      if (!user) {
        return res.status(404).send({
          error: "No user found."
        });
      }
      user.email = crypto.decrypt(user.email, secretKeys.userEmailKey);
      res.status(200).send(user);
    });
  },

  updateProfile: async (req, res, next) => {
    if (Object.keys(req.body).length != 3) {
      return res.status(400).send({
        error: "Invalid Format."
      });
    }

    req.checkBody("name", "Name is required.").notEmpty();
    req.checkBody("name", "Name must be at 4 characters long.").isLength({
      min: 4
    });
    req.checkBody("email", "Email is required.").notEmpty();
    req.checkBody("email", "Enter valid email.").isEmail();

    let errors = req.validationErrors();
    if (errors) {
      return res.status(422).send(errors);
    }

    let user = await User.findOne({
      _id: res.locals.id
    }, 'name email phone');
    let email = crypto.encrypt(req.body.email.toLowerCase(), secretKeys.userEmailKey, secretKeys.userEmailIV);

    if (user.email != email) {
      user = await User.findOne({
        email: email
      }, 'name email phone');
      if (user) {
        return res.status(422).send({
          error: "Email is already used."
        });
      }
    }

    if (phone != req.body.phone) {
      user = await User.findOne({
        phone: phone
      }, 'name email phone');
      if (user) {
        return res.status(422).send({
          error: "Phone is already used by another user."
        });
      }
    }

    user = {
      name: req.body.name,
      email: email,
      phone: req.body.phone
    }
    updateJobSeeker({
      _id: res.locals.id
    }, user, res);
  },

  updatePersonalInfo: async (req, res, next) => {
    let user = await User.findOne({
      _id: res.locals.id
    }, 'fatherName motherName birthDate gender religion maritalStatus nationality nid imageUrl');
    for (let key of Object.keys(user)) {
      user[key] = req.body[key] || user[key];
    }

    updateJobSeeker({
      _id: res.locals.id
    }, user, res);
  },

  updateOthers: async (req, res, next) => {
    let user = await User.findOne({
      _id: res.locals.id
    }, 'academicInfo experience skills');

    for (let key of Object.keys(user)) {
      if (!req.body[key] || req.body[key].length <= 0) {
        user[key] = user[key] || req.body[key];
      } else {
        user[key] = req.body[key];
      }
    }

    updateJobSeeker({
      _id: res.locals.id
    }, user, res);
  },

  updatePassword: async (req, res, next) => {
    let user = await User.findOne({
      _id: res.locals.id
    }, 'password');

    req.checkBody("newPassword", "Password is required.").notEmpty();
    req.checkBody("newPassword", "Password must be 6 character long.").isLength({
      min: 6
    });
    let password = req.body.newPassword;
    req.checkBody("confirmPassword", "Please retype password.").notEmpty();
    req
      .checkBody("confirmPassword", "Please confirm password.")
      .equals(password);

    let errors = req.validationErrors();
    if (errors) {
      return res.status(422).send(errors);
    }

    let oldPassword = crypto.decrypt(user.password, secretKeys.userPasswordKey);

    if (req.body.oldPassword != oldPassword) {
      return res.status(400).send({
        error: "Incorrect Password"
      });
    }

    updateJobSeeker({
      _id: res.locals.id
    }, {
      password: crypto.encrypt(req.body.newPassword, secretKeys.userPasswordKey)
    }, res);
  },

  deleteAccount: (req, res, next) => {
    User.deleteOne({
      _id: res.locals.id
    }, (err) => {
      if (err) {
        return res.status(500).send({
          error: "Server Error."
        });
      } else {
        res.status(200).send({
          success: "User deleted."
        });
      }
    })
  }
};
