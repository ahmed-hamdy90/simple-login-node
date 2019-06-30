(function () {
  'use strict';

  // load modules
  const path = require('path');
  const fileStream = require('fs');

  /**
   * DataFromFileAdapter class is parent class for any data stored on file
   */
  class DataFromFileAdapter {

    /**
     * DataFromFileAdapter constructor
     * @param {string} name name of file which data stored into
     * @param {[type]} type type of file which data stored into
     */
    constructor(name, type) {
      // first make sure given filename and it's type is undefined or empty
      if (!name || !type) {
        throw new Error('Must Given filename and it\'s type');
      }
      this.filePath = path.join(__dirname, '/../data', name + '.' + type);
    }

    /**
     * Getting stored data from file
     * @param  {function} successCallbck success callback funcation, pass stored data as parameter
     * @param  {function} errorCallback  error callback funcation, pass error instance which happened as parameter
     */
    getData(successCallbck, errorCallback) {
      fileStream.readFile(this.filePath, (err, data) => {
         if (err) errorCallback(err);
         successCallbck(data);
      });
    }
  }

  module.exports = DataFromFileAdapter;
})()
