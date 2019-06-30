(function () {
  'use strict';

  // load modules
  const usersDataAdapter = require('../adapters/usersDataAdapter');

  /**
   * UserService class include operation deal with users data
   */
  class UserService {

    /**
     * UserService constructor
     */
    constructor () {
      this.userAdapter = new usersDataAdapter();
    }

    /**
     * Finding user using it's id value
     * @param  {integer}   id             given user's id value
     * @param  {funcation} successCallbck success callback funcation, pass user instance as parameter
     * @param  {funcation} errorCallback  error callback funcation, pass error instance which happened as parameter
     */
    findUserById(id, successCallbck, errorCallback) {
      this.userAdapter.searchForUserWithId(
        id,
        (user) => successCallbck(user),
        (err) => errorCallback(err)
      );
    }

    /**
     * Finding user using some criteria condition(all condition is and case)
     * @param  {Object}    criteria       given criteria will search users with
     * @param  {funcation} successCallbck success callback funcation, pass user instance as parameter
     * @param  {funcation} errorCallback  error callback funcation, pass error instance which happened as parameter
     */
    findUsersWithCriteria(criteria, successCallbck, errorCallback) {
      if ('username' in criteria && 'password' in criteria) {
        // for now only criteria can be search is username and password. TODO: enable all possible
        this.userAdapter.searchForUserWithUsernameAndPassword(
          criteria.username,
          criteria.password,
          (user) => successCallbck(user),
          (err) => errorCallback(err)
        );
      } else {
        // getting all users as same as given criteria was empty
        usersDataAdapter.getUsers(
          (users) => successCallbck(users),
          (err) => errorCallback(err)
        );
      }
    }
  }

  module.exports = UserService;
})();
