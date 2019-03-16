const jwt = require('jsonwebtoken');
const fs = require('fs');

const Employer = require("../models/employers.model");
const crypto = require("../libs/data-encryption");
let secretKeys = require("../config/secret.key");

function updateEmployer(conditions, employer, options, res) {
  Employer.updateOne(conditions, employer, options, (err, result) => {
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

    let employer = await Employer.findOne({
      username: req.body.username
    }, "username");
    if (employer) {
      return res.status(400).send({
        error: "Username is already used."
      });
    }

    let email = crypto.encrypt(
      req.body.email.toLowerCase(),
      secretKeys.employerEmailKey,
      secretKeys.employerEmailIV
    );

    employer = await Employer.findOne({
      email: email
    }, "email");
    if (employer) {
      return res.status(400).send({
        error: "Email is used."
      });
    }

    let newEmployer = new Employer({
      username: req.body.username,
      name: req.body.name,
      email: email,
      password: crypto.encrypt(password, secretKeys.employerPasswordKey)
    });

    newEmployer.save(newEmployer, (err, employer) => {
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

    let email = crypto.encrypt(req.body.email.toLowerCase(), secretKeys.employerEmailKey, secretKeys.employerEmailIV);

    let employer = await Employer.findOne({
      email: email
    }, "name email password");

    if (!employer || req.body.password != crypto.decrypt(employer.password, secretKeys.employerPasswordKey)) {
      return res.status(401).send({
        error: ['Incorrect email or password.']
      });
    }

    jwt.sign({
      id: employer._id,
      name: employer.name
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
    Employer.findById(res.locals.id, {
      username: 0,
      password: 0
    }, (err, employer) => {
      if (err || !employer) {
        return res.status(500).send({
          error: "Server Error."
        });
      }
      employer.email = crypto.decrypt(employer.email, secretKeys.employerEmailKey);
      employer.imagePath = employer.imagePath ? req.protocol + "://" + "localhost:3000" + '/' + employer.imagePath : "";
      res.status(200).send(employer);
    });
  },

  getProfileByUserName: async (req, res, next) => {
    Employer.findOne({
      username: req.params.username
    }, 'name email imagePath rating jobs', (err, employer) => {
      if (err) {
        return res.status(500).send({
          error: "Server Error."
        });
      }

      if (!employer) {
        return res.status(404).send({
          error: "No employer found."
        });
      }
      employer.email = crypto.decrypt(employer.email, secretKeys.employerEmailKey);
      res.status(200).send(employer);
    });
  },

  updateProfile: async (req, res, next) => {
    if (Object.keys(req.body).length > 3) {
      return res.status(400).send({
        error: "Invalid Format."
      });
    }

    req.checkBody("name", "Name must be at 4 characters long.").notEmpty().isLength({
      min: 4
    });
    req.checkBody("email", "Enter valid email.").notEmpty().isEmail();
    req.checkBody('phone', 'Phone is required.').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
      return res.status(422).send(errors);
    }

    let employer = await Employer.findOne({
      _id: res.locals.id
    }, {
      password: 0
    });

    let email = crypto.encrypt(req.body.email, secretKeys.employerEmailKey, secretKeys.employerEmailIV);
    if (email != employer.email) {
      let checkEmail = await Employer.findOne({
        email: email
      });
      if (checkEmail) {
        res.status(422).send({
          error: "Email is already used."
        });
      }
    }

    if (req.body.phone != employer.phone) {
      let checkPhone = await Employer.findOne({
        phone: req.body.phone
      });
      if (checkPhone) {
        res.status(422).send({
          error: "Phone is already used."
        });
      }
    }

    newEmployer = {
      name: req.body.name,
      phone: req.body.phone,
      email: crypto.encrypt(req.body.email.toLowerCase(), secretKeys.employerEmailKey, secretKeys.employerEmailIV)
    }
    updateEmployer({
      _id: res.locals.id
    }, newEmployer, {
      new: true
    }, res);
  },

  updateProfileImage: async (req, res, next) => {
    if (!req.file) {
      return res.status(400).send({
        error: "No file is selected."
      });
    }

    let employer = await Employer.findOne({
      _id: res.locals.id
    }, 'imagePath');
    if (employer.imagePath) {
      fs.unlinkSync(employer.imagePath);
    }

    let imagePath = 'public/uploads/' + req.file.filename || employer.imagePath;
    updateEmployer({
      _id: res.locals.id
    }, {
      imagePath: imagePath
    }, {
      new: true
    }, res);
  },

  updatePassword: async (req, res, next) => {
    let employer = await Employer.findOne({
      _id: res.locals.id
    }, 'password');

    req.checkBody("newPassword", "Password must be 6 character long.").notEmpty().isLength({
      min: 6
    });
    let password = req.body.newPassword;
    req
      .checkBody("confirmPassword", "Please confirm password.").notEmpty()
      .equals(password);

    let errors = req.validationErrors();
    if (errors) {
      return res.status(422).send(errors);
    }

    let oldPassword = crypto.decrypt(employer.password, secretKeys.employerPasswordKey);

    if (req.body.oldPassword != oldPassword) {
      return res.status(400).send({
        error: "Incorrect Password"
      });
    }

    updateEmployer({
      _id: res.locals.id
    }, {
      password: crypto.encrypt(req.body.newPassword, secretKeys.employerPasswordKey)
    }, res);
  },

  updateCompany: async (req, res, next) => {
    if (Object.keys(req.body).length > 7) {
      return res.status(422).send({
        error: "Invalid data format."
      });
    }

    let employer = await Employer.findOne({
      _id: res.locals.id
    }, 'company');

    let company = {
      name: req.body.name || employer.company.name || "",
      location: req.body.location || employer.company.location || "",
      companyType: req.body.companyType || employer.company.companyType || "",
      industryType: req.body.industryType || employer.company.industryType || "",
      maxEmployee: req.body.maxEmployee || employer.company.maxEmployee || 0,
      minEmployee: req.body.minEmployee || employer.company.minEmployee || 0,
      website: req.body.website || employer.company.website || "",
    }

    updateEmployer({
      _id: req.locals.id
    }, company, res);
  },

  deleteAccount: (req, res, next) => {
    Employer.deleteOne({
      _id: res.locals.id
    }, (err) => {
      if (err) {
        return res.status(500).send({
          error: "Server Error."
        });
      } else {
        res.status(200).send({
          success: "Account deleted."
        });
      }
    })
  }
};
