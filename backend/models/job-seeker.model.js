const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  username: String,
  name: String,
  phone: String,
  email: String,
  termsAgreement: Boolean,
  password: String,
  fatherName: String,
  motherName: String,
  birthDate: Date,
  gender: String,
  religion: String,
  maritalStatus: String,
  nationality: String,
  nid: String,
  imageUrl: String,
  currentAddress: {
    street: String,
    city: String,
    zipCode: Number
  },
  permanentAddress: {
    street: String,
    city: String,
    zipCode: Number
  },
  academicInfo: [{
    examTitle: String,
    major: String,
    institute: String,
    result: Number,
    passingYear: Number,
    duration: Number,
    board: String
  }],
  workExperience: [{
    orgName: String,
    position: String,
    joinDate: Date,
    resignDate: Date,
    salary: Number
  }],
  skills: [String],
  contactInfo: [{
    contactName: String,
    contact: String
  }]
});

module.exports = mongoose.model("user", userSchema);
