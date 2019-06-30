(function () {
  'use strict';

  // load modules
  const sha1EcryptUtil = require('../utils/sha1EncryptionUtil');
  const userService = require('./userService');

  /**
   * AuthenticationService class responsible for authentication operations
   */
  class AuthenticationService {

    /**
     * AuthenticationService constructor
     */
    constructor () {
      this.userService = new userService();
    }

    /**
     * login operation
     * @param  {string}    username       username of login user
     * @param  {string}    password       password of login user
     * @param  {funcation} successCallbck success callback funcation, pass user instance as parameter
     * @param  {funcation} errorCallback  error callback funcation, pass error instance which happened as parameter
     */
    login(username, password, successCallbck, errorCallback) {
      let criteria = {
        username : username,
        password : sha1EcryptUtil.encrypt(password)
      }
      this.userService.findUsersWithCriteria(
        criteria,
        successCallbck,
        errorCallback
      );
    }

    /**
     * logout operation
     * @param  {funcation} successCallbck success callback funcation, pass user instance as parameter
     * @param  {funcation} errorCallback  error callback funcation, pass error instance which happened as parameter
     */
    logout(successCallbck, errorCallback) {
      // TODO: implement it as now there no useless need it
    }
  }

  module.exports = AuthenticationService;
})();
