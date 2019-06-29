(function () {
  'use strict';

  // load modules
  const express = require('express');
  const path = require('path');
  const fileStream = require('fs');

  // initilaize express's router instance
  const router = express.Router();

  router.get('/:id', (req, res) => {
    let userId = parseInt(req.params.id);
    // check out must session include userID and must be the same one
    if (!req.session.userId) {
      return res.redirect('/');
    }
    if (userId) {
      searchForUser(
        userId,
        (user) => {
          res.render('user', {name: user.name, id: user.userID, email: user.username, company: user.company});
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

  function searchForUser(id, successCallbck, errorCallback) {
      const userDataPath = path.join(__dirname, '/../data', 'login.json');
      fileStream.readFile(userDataPath, (err, data) => {
          if (err) errorCallback(err);
          let users = JSON.parse(data);
          let isUserExists = false;
          let existsUser;
          if (Array.isArray(users)) {
            for (let counter = 0; counter < users.length; counter++) {
                let user = users[counter];
                if (parseInt(user.userID) === id) {
                    existsUser = user;
                    isUserExists = true;
                    break;
                }
            }
          }

         if (isUserExists) {
           successCallbck(existsUser);
         } else {
           errorCallback(new Error('user not found'));
         }
      });
  }

  module.exports = router;
})();
