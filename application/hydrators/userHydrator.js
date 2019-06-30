(function () {
  'use strict';

  // load modules
  const user = require('../entities/user');

  /**
   * UserHydrator class represent hydrator class which hydrate any user's data on User instance
   */
  class UserHydrator {

    /**
     * UserHydrator constructor
     * @param {Object} row user's data as object
     */
    constructor(row) {
      this.row = row;
    }

    /**
     * Hydration operation for user's data on User instance
     * @return {User} hydrated User instance
     */
    hydrate() {
       let userObject = new user(this.row.username);
       if (this.row.userID && this.row.userID.length > 0) {
         userObject.setId(this.row.userID);
       }
       if (this.row.name && this.row.name.length > 0) {
         userObject.setName(this.row.name);
       }
       if (this.row.company && this.row.company.length > 0) {
         userObject.setCompany(this.row.company);
       }
       return userObject;
    }
  }

  module.exports = UserHydrator;
})()
