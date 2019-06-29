(function () {
  'use strict';

  // load modules
  const express = require('express');

  // initilaize express's router instance
  const router = express.Router();

  router.get('/', (req, res) => {
    let userId = (req.session.userId)? parseInt(req.session.userId) : undefined;
    if (userId) {
      res.redirect('/user/' + userId);
    } else {
      let username = (req.session.username)? req.session.username : undefined;
      let error = (req.session.error)? parseInt(req.session.error) : undefined;
      let errorMessage = "";
      if (error) {
        switch (error) {
          case 1:
            errorMessage = "Must send correct username or password";
            break;
          case 2:
            errorMessage = "Wrong User Must Login in";
            break;
          case 3:
            errorMessage = "Both uername and password must not be empty";
            break;
        }
      }
      // then reset session
      req.session.destroy((err) => console.log('session destroy'));
      res.render('index', {username: username, error: errorMessage});
    }
  });

  module.exports = router;
})();
