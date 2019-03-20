const app = require("express")();
const jwt = require('jsonwebtoken');
let secretKeys = require('../config/secret.key');

let jobController = require('../controllers/jobs.controller');

function isUserAuthenticated(req, res, next) {
  let token = req.headers['__jsx__'];
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

function isEmployerAuthenticated(req, res, next) {
  let token = req.headers['__ex__'];
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

app.route('/')
  .get(jobController.getAllJobs)
  .post(isEmployerAuthenticated, jobController.post);

app.route('/:id')
  .get(jobController.getJobById)
  .put(isEmployerAuthenticated, jobController.updateJob)
  .delete(isEmployerAuthenticated, jobController.deleteJob);

module.exports = app;
