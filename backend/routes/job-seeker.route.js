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
let jobSeekerController = require('../controllers/job-seeker.controller');

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

app.post('/register', jobSeekerController.register);

app.post('/login', jobSeekerController.login);

app.get('/logout', jobSeekerController.logout);

app.route('/profile')
  .get(isUserAuthenticated, jobSeekerController.getProfile)
  .put(isUserAuthenticated, jobSeekerController.updateProfile)
  .delete(isUserAuthenticated, jobSeekerController.deleteAccount);

app.put('/photo', isUserAuthenticated, upload.single('profileImage'), jobSeekerController.updateProfileImage);
app.put('/contact', isUserAuthenticated, jobSeekerController.updateContactInfo);
app.put('/address', isUserAuthenticated, jobSeekerController.updateAddress);
app.put('/others', isUserAuthenticated, jobSeekerController.updateOthers);
app.put('/password', isUserAuthenticated, jobSeekerController.updatePassword);

module.exports = app;
