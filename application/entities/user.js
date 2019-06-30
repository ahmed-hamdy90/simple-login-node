(function () {
  'use strict';

  /**
   * User Entity class
   */
  class User {

     /**
      * User constructor
      * @param {string} username user's username value
      */
     constructor(username) {
       this.username = username;
     }

     /**
      * Getting user's username value
      * @return {string}
      */
     getUsername() {
       return this.username;
     }

     /**
      * Setting user's id value
      * @param {integer} id given id of user
      */
     setId(id) {
       this.id = parseInt(id);
     }

     /**
      * Getting user's id value
      * @return {integer}
      */
     getId() {
       return this.id;
     }

     /**
      * Setting user's name value
      * @param {string} id given name of user
      */
     setName(name) {
       this.name = name;
     }

     /**
      * Getting user's name value
      * @return {string}
      */
     getName() {
       return this.name;
     }

     /**
      * Setting user's company value
      * @param {string} id given company which user work for
      */
     setCompany(company) {
       this.company = company;
     }

     /**
      * Getting user's company value
      * @return {string}
      */
     getCompany() {
       return this.company;
     }

     /**
      * Setting user's plain password value
      * @param {string} id given plain password of user
      */
     setPlainPassword(password) {
       this.password = password;
     }

     /**
      * Getting user's plain password value
      * @return {string}
      */
     getPlainPassword() {
       return this.password;
     }
  }

  module.exports = User;
})()
