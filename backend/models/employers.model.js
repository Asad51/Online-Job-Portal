const mongoose = require('mongoose');

let employerSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  phone: String,
  password: String,
  imagePath: String,
  company: {
    name: String,
    location: String,
    companyType: String,
    industryType: String,
    companySize: String,
    website: String
  },
  rating: {
    type: Number,
    default: 0.0
  },
  jobs: [Number]
});

module.exports = mongoose.model('employers', employerSchema);
