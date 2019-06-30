(function () {
  'use strict';

  // load modules
  const crypto = require('crypto');

  /**
   * SHA1EncryptionUtil class is Utility class for encrypt text with SHA1 encription
   */
  class SHA1EncryptionUtil {

    /**
     * Encrypting given text with SHA1
     * @param  {string} text text wanted to encrypt
     * @return {string} encrypted text
     */
    static encrypt(text) {
      const hash = crypto.createHash('sha1');
      let encryptText = hash.update(text, 'utf-8');
      return encryptText.digest('hex');
    }
  }

  module.exports = SHA1EncryptionUtil;
})();
