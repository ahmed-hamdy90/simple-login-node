(function () {
  'use strict';

  // load modules
  const dataFromFileAdapter = require('./dataFromFileAdapter');
  const userHydrator = require('../hydrators/userHydrator');

  /**
   * UsersDataAdapter class which responsible for getting or search on users data which stored on file
   * @extends dataFromFileAdapter
   */
  class UsersDataAdapter extends dataFromFileAdapter {

    /**
     * UsersDataAdapter constructor
     */
    constructor() {
      super('users', 'json');
    }

    /**
     * Getting all exists users data which stored on the file
     * @param  {function} successCallbck success callback funcation, pass array of users objects as parameter
     * @param  {function} errorCallback  error callback funcation, pass error instance which happened as parameter
     */
    getUsers(successCallbck, errorCallback) {
      this.getData(
        (data) => {
             let users = JSON.parse(data);
             let usersObjects = [];
             if (Array.isArray(users)) {
               for (let counter = 0; counter < users.length; counter++) {
                   let user = users[counter];
                   let userHydratorInstance = new userHydrator(user);
                   usersObjects.push(userHydratorInstance.hydrate());
               }
             }
             successCallbck(usersObjects);
        },
        errorCallback
      );
    }

   /**
    * Searching for user's data using given id at users data which stored on the file
    * @param  {integer}  id              user's id value which wanted to search with
    * @param  {function} successCallbck success callback funcation, pass searched user object as parameter
    * @param  {function} errorCallback  error callback funcation, pass error instance which happened as parameter
    */
    searchForUserWithId(id, successCallbck, errorCallback) {
      this.getData(
        (data) => {
             let users = JSON.parse(data);
             let searchedUser;
             if (Array.isArray(users)) {
               for (let counter = 0; counter < users.length; counter++) {
                   let user = users[counter];
                   // check if user's id is same as search user
                   if (parseInt(user.userID) === id) {
                     // hydrate searched user object
                     let userHydratorInstance = new userHydrator(user);
                     searchedUser = userHydratorInstance.hydrate();
                     break;
                   }
               }
             }
             if (searchedUser) {
               successCallbck(searchedUser);
             } else {
                errorCallback(new Error('User not found'));
             }
        },
        errorCallback
      );
    }

    /**
     * Searching for user's data using given username and password at users data which stored on the file
     * @param  {string}   username       user's username value which wanted to search with
     * @param  {string}   password       user's password value which wanted to search with
     * @param  {function} successCallbck success callback funcation, pass searched user object as parameter
     * @param  {function} errorCallback  error callback funcation, pass error instance which happened as parameter
     */
    searchForUserWithUsernameAndPassword(username, password, successCallbck, errorCallback) {
      this.getData(
        (data) => {
             let users = JSON.parse(data);
             let searchedUser;
             if (Array.isArray(users)) {
               for (let counter = 0; counter < users.length; counter++) {
                   let user = users[counter];
                   // check if user's username and password is same as search user
                   if (user.username === username && user.password === password) {
                     // hydrate searched user object
                     let userHydratorInstance = new userHydrator(user);
                     searchedUser = userHydratorInstance.hydrate();
                     break;
                   }
               }
             }
             if (searchedUser) {
               successCallbck(searchedUser);
             } else {
                errorCallback(new Error('User not found'));
             }
        },
        errorCallback
      );
    }
  }

  module.exports = UsersDataAdapter;
})()
