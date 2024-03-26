const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
});

router.get(
  '/github-authorize/',
  passport.authenticate('github', {
    scope: ['user:email']
  })
);

router.get(
  '/github-oauth-callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.send(`Received code: ${req.query.code} `);
  }
);

module.exports = router;
