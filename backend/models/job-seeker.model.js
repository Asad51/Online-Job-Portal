const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  username: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  termsAgreement: {
    type: Boolean
  },
  password: {
    type: String
  },
  fatherName: {
    type: String
  },
  motherName: {
    type: String
  },
  birthDate: {
    type: Date
  },
  gender: {
    type: String
  },
  religion: {
    type: String
  },
  maritalStatus: {
    type: String
  },
  nationality: {
    type: String
  },
  nid: {
    type: Number
  },
  imageUrl: {
    type: String
  },
  academicInfo: [{
    degree: {
      type: String
    },
    institute: {
      type: String
    },
    section: {
      type: String
    },
    passing: {
      type: Number
    },
    cgpa: {
      type: Number
    }
  }],
  experience: [{
    company: {
      type: String
    },
    type: {
      type: String
    },
    duration: {
      type: Number
    }
  }],
  skills: [String]
});

module.exports = mongoose.model("user", userSchema);
