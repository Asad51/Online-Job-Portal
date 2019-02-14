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
  personalInfo: {
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
    username: {
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
    nationality: {
      type: String
    },
    imageUrl: {
      type: String
    }
  }
});

module.exports = mongoose.model("user", userSchema);
