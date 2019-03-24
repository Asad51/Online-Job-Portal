const app = require("express")();
const jwt = require('jsonwebtoken');
const multer = require('multer');
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
let upload = multer({
  storage: storage
});

let secretKeys = require('../config/secret.key');
let employerController = require('../controllers/employer.controller');

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

app.get('/', employerController.getAllEmployer);

app.post('/register', employerController.register);

app.post('/login', employerController.login);

app.get('/logout', employerController.logout);

app.route('/profile')
  .get(isEmployerAuthenticated, employerController.getProfile)
  .put(isEmployerAuthenticated, employerController.updateProfile)
  .delete(isEmployerAuthenticated, employerController.deleteAccount);

app.put('/photo', isEmployerAuthenticated, upload.single('profileImage'), employerController.updateProfileImage);
app.put('/password', isEmployerAuthenticated, employerController.updatePassword);
app.put('/company', isEmployerAuthenticated, employerController.updateCompany);

module.exports = app;
