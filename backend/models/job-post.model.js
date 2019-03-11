const mongoose = require('mongoose');

let jobSchema = mongoose.Schema({
  jobId: Number,
  imagePath: String,
  jobTitle: String,
  company: String,
  publishedOn: Date,
  vacancy: Number,
  type: String,
  experience: String,
  location: String,
  salary: Number,
  deadline: Date,
  jobResponsibilities: [String],
  educationalRequirements: String,
  appliedApplicants: [String]
});

module.exports = mongoose.model("jobs", jobSchema);
