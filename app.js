//** REQUIRES --------------------------------------------------------------- */
/* eslint-disable no-console */
const express = require('express'); // https://www.npmjs.com/package/express
const bodyParser = require('body-parser');  // https://www.npmjs.com/package/body-parser
const morgan = require('morgan'); // https://www.npmjs.com/package/morgan
const routes = require('./routes');

require('dotenv').config();
morgan(':method :url :status :res[content-length] - :response-time ms');

//** VARIABLES -------------------------------------------------------------- */
var passport = require('passport');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;

const isLocalHost = false;

const githubClientId = isLocalHost
  ? process.env.GITHUB_CLIENT_ID_LOCALHOST
  : process.env.GITHUB_CLIENT_ID;
const githubClientSecret = isLocalHost
  ? process.env.GITHUB_CLIENT_SECRET_LOCALHOST
  : process.env.GITHUB_CLIENT_SECRET;
const githubCallbackUrl = isLocalHost
  ? process.env.GITHUB_CALLBACK_URL_LOCALHOST
  : process.env.GITHUB_CALLBACK_URL;

//** METHODS ---------------------------------------------------------------- */

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//** MIDDLEWARES ------------------------------------------------------------ */

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(
  new GitHubStrategy(
    {
      clientID: githubClientId,
      clientSecret: githubClientSecret,
      callbackURL: githubCallbackUrl
    },
    function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

const app = express();
// const appTesting = express();

// Use static files
app.use(express.static('./static'));

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//
// app.use(cors());

//
app.use((req, res, next) => {
  // https://www.youtube.com/watch?v=fLv6KkCOZ3o
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    // "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    'Content-Type'
  );
  // res.setHeader("Content-Type", "application/json");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

//
app.use(session({ secret: 'keyboard-cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
// app.use(passport.initialize());
// app.use(passport.session());

// https://www.npmjs.com/package/morgan#examples
app.use(morgan('tiny'));

//
app.use('/', routes);
// appTesting.use('/', routes);


module.exports = app;
