const env = process.env.NODE_ENV;
let config = null;

if (env == 'development') {
  config = {
    port: 3000,
    dbUrl: "mongodb://localhost/db_job_portal"
  };
} else if (env == 'production') {
  config = {
    port: 3000,
    dbUrl: "mongodb://Asad51:%User123@ds055865.mlab.com:55865/db_job_portal"
  };
} else {
  config = {
    port: 3000,
    dbUrl: "mongodb://localhost/db_job_portal"
  };
}

module.exports = config;
