const app = require("express")();
const jwt = require('jsonwebtoken');

let secretKeys = require('../config/secret.key');
let jobSeekerController = require('../controllers/job-seeker.controller');

function isUserAuthenticated(req, res, next) {
  let token = req.headers['__u_x__'];

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

app.post('/register', jobSeekerController.register);

app.post('/login', jobSeekerController.login);

app.get('/logout', jobSeekerController.logout);

app.route('/profile')
  .get(isUserAuthenticated, jobSeekerController.getProfile);

module.exports = app;
