const app = require('express')();

// catch 404 error handler
app.use(function (req, res, next) {
  res.status(404).send({
    error: "Page Not Found"
  });
});

// server error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    error: 'Server  Error'
  });
});

module.exports = app;
