const Job = require("../models/job-post.model");
const Category = require('../models/category.model');

module.exports = {
  post: async (req, res, next) => {
    let job = new Job({
      imagePath: req.body.imagePath || "",
      jobTitle: req.body.jobTitle || "",
      company: req.body.company || "",
      publishedOn: req.body.publishedOn || "",
      vacancy: req.body.vacancy,
      type: req.body.type || "",
      category: req.body.category || "",
      experience: req.body.experience,
      location: req.body.location,
      salary: req.body.salary,
      deadline: req.body.deadline,
      jobResponsibilities: req.body.jobResponsibilities,
      educationalRequirements: req.body.educationalRequirements,
      appliedApplicants: []
    });

    job.save(job, async (err, jobPosted) => {
      if (err) {
        return res.status(500).send({
          error: "Server Error."
        });
      }
      let category = await Category.findOne({
        value: req.body.category
      });
      category.jobId.push(String(job._id));
      Category.updateOne({
        _id: category._id
      }, {
        jobId: category.jobId
      }, (err, r) => {});
      res.status(201).send({
        success: "Job Posted Successfully."
      });
    });
  },

  getAllJobs: (req, res, next) => {
    Job.find({}, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Server Error."
        });
      }
      res.status(201).send(result);
    });
  },

  getJobById: (req, res, next) => {
    let id = req.params.id;
    Job.findById(id, (err, job) => {
      if (err || !job) {
        return res.status(500).send({
          error: "Server Error."
        });
      }
      res.status(201).send(job);
    });
  },

  updateJob: async (req, res, next) => {
    let id = req.params.id;
    Job.findById(id, (err, job) => {
      if (err) {
        return res.status(500).send({
          error: "Server Error."
        });
      }
      if (res.locals.id != job.userId) {
        return res.status(401).send({
          error: "Not Authorized"
        });
      }
      let updatedJob = {
        imagePath: req.body.imagePath || job.imagePath || "",
        jobTitle: req.body.jobTitle || job.jobTitle || "",
        company: req.body.company || job.company || "",
        publishedOn: req.body.publishedOn || job.publishedOn || "",
        vacancy: req.body.vacancy || job.vacancy,
        type: req.body.type || job.type || "",
        experience: req.body.experience || job.experience,
        location: req.body.location || job.location,
        salary: req.body.salary || job.salary,
        deadline: req.body.deadline || job.deadline,
        jobResponsibilities: req.body.jobResponsibilities || job.jobResponsibilities,
        educationalRequirements: req.body.educationalRequirements || job.educationalRequirements,
        appliedApplicants: req.body.appliedApplicants || job.appliedApplicants
      };

      Job.updateOne({
          _id: id
        },
        updatedJob,
        (err, job) => {
          if (err) {
            return res.status(500).send({
              error: "Server Error."
            });
          }
          res.status(201).send({
            success: "Job updated Successfully."
          });
        }
      );
    });
  },

  deleteJob: (req, res, next) => {
    let id = req.params.id;
    Job.findById(id, (err, job) => {
      if (err || !job) {
        if (err) {
          return res.status(500).send({
            error: "Server Error."
          });
        }
        if (res.locals.id != job.userId) {
          return res.status(401).send({
            error: "Not Authorized"
          });
        }
        Job.deleteOne({
            _id: id
          },
          (err, result) => {
            if (err || !result.n) {
              return res.status(500).send({
                error: "Server Error."
              });

              res.status(201).send({
                success: "Job deleted Successfully."
              });
            }
          }
        );
      }
    });
  }
};
