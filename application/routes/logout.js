(function () {
  'use strict';

  // load modules
  const express = require('express');

  // initilaize express's router instance
  const router = express.Router();

  router.get('/', (req, res) => {
    req.session.destroy((err) => res.redirect('/'));
  });

  module.exports = router;
})();
