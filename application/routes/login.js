(function () {
  'use strict';

  // load modules
  const express = require('express');
  const path = require('path');
  const fileStream = require('fs');
  const crypto = require('crypto');

  // initilaize express's router instance
  const router = express.Router();

  router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.pass;
    searchForUser(
      username,
      password,
      (user) => {
        req.session.userId = user.userID;
        res.redirect('/user/' + user.userID);
      },
      (err) => {
        req.session.username = username;
        req.session.error = 1;
        res.redirect('/');
      }
    );
  });

  /**
  * Searching for User using it's username and password
  */
  function searchForUser(username, password, successCallbck, errorCallback) {
      const userDataPath = path.join(__dirname, '/../data', 'login.json');
      const hashedPassword = hashPassword(password);
      fileStream.readFile(userDataPath, (err, data) => {
          if (err) errorCallback(err);
          let users = JSON.parse(data);
          let isUserExists = false;
          let existsUser;
          if (Array.isArray(users)) {
            for (let counter = 0; counter < users.length; counter++) {
                let user = users[counter];
                if (user.username === username && user.password === hashedPassword) {
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

  /**
  * Hasing plain passwoed with sha1
  */
  function hashPassword(plainPassword) {
    const hash = crypto.createHash('sha1');
    let encryptPassword = hash.update(plainPassword, 'utf-8');
    return encryptPassword.digest('hex');
  }

  module.exports = router;
})();
