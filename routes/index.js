const router = require('express').Router();
const users = require('./users');
const transactions = require('./transactions.js');

let docData;

// TO ROUTES
router.use('/users', users);
router.use('/transactions', transactions);

// TO OAUTH
router.use('/', require('./oauth.js'));

// TO SWAGGER
router.use('/', require('./swagger'));

// WRONG PATH
router.use(
  '/',
  (docData = (req, res) => {
    docData = {
      documentationURL: 'https://cse341.netlify.app/projects/3'
    };
    res.send(docData);
  })
);

module.exports = router;
