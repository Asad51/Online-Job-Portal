const mongoose = require('mongoose');

module.exports = mongoose.model('admin', mongoose.Schema({
  name: String,
  email: String,
  password: String,
}));
