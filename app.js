//** REQUIRES --------------------------------------------------------------- */

/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const connection = require('./db/connect');
const routes = require('./routes');

var passport = require('passport');
var session = require('express-session');
// var GitHubStrategy = require('passport-github2').Strategy;

//** CONSTANTS -------------------------------------------------------------- */

require('dotenv').config();
const isLocalHost = false;
const port = process.env.PORT || 8080;
const render = process.env.RENDER_URI;

const googleClientId = isLocalHost
  ? process.env.GOOGLE_CLIENT_ID_LOCALHOST
  : process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = isLocalHost
  ? process.env.GOOGLE_CLIENT_SECRET_LOCALHOST
  : process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackUrl = isLocalHost
  ? process.env.GOOGLE_CALLBACK_URL_LOCALHOST
  : process.env.GOOGLE_CALLBACK_URL;

console.log(`Is localhost (app.js): ${isLocalHost}`);
console.log(`googleClientId - ${googleClientId}`);
console.log(`googleClientSecret - ${googleClientSecret}`);
console.log(`googleCallbackUrl - ${googleCallbackUrl}`);

//** METHODS ---------------------------------------------------------------- */

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

//** MIDDLEWARES ------------------------------------------------------------ */

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: googleClientId,
//       clientSecret: googleClientSecret,
//       callbackURL: googleCallbackUrl
//     },
//     function (accessToken, refreshToken, profile, done) {
//       // asynchronous verification, for effect...
//       process.nextTick(function () {
//         return done(null, profile);
//       });
//     }
//   )
// );

const app = express();

// Use static files
// app.use(express.static('./static'));

app.use(bodyParser.json());
// .use(cors())
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
app.use(session({ secret: 'keyboard-cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
// app.use(passport.initialize());
// app.use(passport.session());
app.use(`/`, routes);

connection.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
    console.log(`API documentation - localhost: http://localhost:${port}/api-docs`);
    console.log(`API documentation - Production server: ${render}/api-docs`);
  }
});
