const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require("passport");
const morgan = require('morgan');
const MongoStore = require('connect-mongo')(session);

const app = require('express')();

const secretKeys = require('./secret.key');
const config = require('./env.config');

/***** Third Party Middleware *****/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser(secretKeys.session));
app.use(session({
  name: 'x-auth',
  secret: secretKeys.session,
  saveUninitialized: true,
  resave: false,
  cookie: {
    name: 'x-auth',
    expires: false
  },
  store: new MongoStore({
    url: config.dbUrl
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(morgan('dev'));

app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    let namespace = param.split('.');
    let root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return msg;
  }
}));

module.exports = app;
