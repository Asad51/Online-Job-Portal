let app = require('express')();
const jwt = require('jsonwebtoken');
const Category = require('../models/category.model');

let secretKeys = require('../config/secret.key');
let adminController = require('../controllers/admin.controller');

function isAdminAuthenticated(req, res, next) {
  let token = req.headers['__aux__'];
  if (!token) {
    return res.status(401).send({
      error: ['You are not logged in.']
    });
  }

  jwt.verify(token, secretKeys.jwt, {
    algorithms: ['HS256'],
    expiresIn: '30d'
  }, (err, decodedToken) => {
    if (err) {
      return res.status(403).send({
        error: ['You are not logged in.']
      });
    }
    res.locals.id = decodedToken.id;
    next();
  });
}

app.post("/add-admin", adminController.addAdmin);
app.post("/login", adminController.login);
app.get("/logout", isAdminAuthenticated, adminController.logout);

app.post("/categories", isAdminAuthenticated, (req, res, next) => {
  let newCategory = new Category({
    name: req.body.name,
    value: req.body.value,
    jobId: []
  });

  newCategory.save(newCategory, (err, cat) => {
    if (err) {
      return res.status(500).send({
        error: "Server Error."
      });
    }

    res.status({
      "success": "Category added."
    });
  });
});

module.exports = app;
