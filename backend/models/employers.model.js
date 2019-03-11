const mongoose = require('mongoose');

let employerSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  phone: String,
  password: String,
  imagePath: String,
  rating: Number,
  jobs: [Number]
});

module.exports = mongoose.model('employers', employerSchema);
