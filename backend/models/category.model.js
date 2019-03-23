const mongoose = require('mongoose');

module.exports = mongoose.model("categories", mongoose.Schema({
  name: String,
  value: String,
  jobId: [{
    type: Number,
    ref: "jobs"
  }]
}));
