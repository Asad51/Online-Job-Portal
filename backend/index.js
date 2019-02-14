const http = require('http');
const fs = require('fs');
const debug = require('debug');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

let app = require('./config/app.config');
let config = require('./config/env.config');

let port = process.env.PORT || config.port;
let dbUrl = config.dbUrl;

/***** Request Handling *****/
let errorsRoute = require('./routes/error.route');
let jobSeekerRoute = require('./routes/job-seeker.route');

app.use('/user', jobSeekerRoute);
app.use(errorsRoute);


/***** Server Handling *****/
let server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
server.on('close', onClose);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
  mongoose.connect(dbUrl, {
      useNewUrlParser: true
    },
    onConnect);
  console.log("Server running at " + bind);
}

function onClose(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server Closed.");
  }
  mongoose.disconnect(onDisconnect);
}

/***** Database Error Handling *****/
let onConnect = function (err) {
  if (err) {
    console.log("Can't connect database");
  } else {
    console.log("Database connected");
  }
};

let onDisconnect = function (err) {
  if (err) {
    console.log("Can't disconnect database");
  } else {
    console.log("Database disconnected");
  }
};
