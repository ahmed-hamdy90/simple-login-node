(function () {
  'use strict';

  // load modules
  const express = require('express');

  const userService = require('../services/userService');

  // initilaize express's router instance
  const router = express.Router();

  router.get('/:id', (req, res) => {
    let userId = parseInt(req.params.id);
    // check out must session include userID and must be the same one
    if (!req.session.userId) {
      return res.redirect('/');
    }
    if (userId) {
      let userServiceInstance = new userService();
      userServiceInstance.findUserById(
        userId,
        (user) => {
          res.render(
            'user',
            {
              id: user.getId(),
              name: user.getName(),
              email: user.getUsername(),
              company: user.getCompany()
            }
          );
        },
        (err) => {
          req.session.error = 2;
          res.redirect('/');
        }
      );
    } else {
      req.session.error = 2;
      res.redirect('/');
    }
  });

  module.exports = router;
})();
