const mongoose = require('mongoose');

module.exports = mongoose.model("categories", mongoose.Schema({
  name: String,
  value: String,
  jobId: [{
    Type: mongoose.Types.ObjectId,
    ref: "jobs"
  }]
}));
