const mongoose = require("mongoose");

let jobSchema = mongoose.Schema({
  imagePath: String,
  jobTitle: String,
  company: String,
  publishedOn: {
    type: Date,
    default: Date.now
  },
  vacancy: Number,
  type: String,
  category: String,
  experience: String,
  location: String,
  salary: Number,
  deadline: Date,
  jobResponsibilities: [String],
  educationalRequirements: String,
  appliedApplicants: [String]
});

module.exports = mongoose.model("jobs", jobSchema);
