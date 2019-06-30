(function () {
  'use strict';

  // load modules
  const express = require('express');

  const authService = require('../services/authenticationService');

  // initilaize express's router instance
  const router = express.Router();

  router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.pass;

    let authServiceInstance = new authService();
    authServiceInstance.login(
      username,
      password,
      (user) => {
        req.session.userId = user.getId();
        res.redirect('/user/' + user.getId());
      },
      (err) => {
        req.session.username = username;
        req.session.error = 1;
        res.redirect('/');
      }
    );
  });

  module.exports = router;
})();
