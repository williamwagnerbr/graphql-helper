//const moment = require('moment');
const uuid = require('uuid/v4');

module.exports = function MemoryStorage () {
  var memoryStorage = {};

  /**
   * Define record
   * @param {string} id
   * @param {array} items
   * @returns {Promise(string)}
   */
  this.set = async function (items) {
    var id = uuid();
    memoryStorage[id] = items;
    return id;
  }

  /**
   * Return record
   * @param {string} id
   * @returns {Promise(object)}
   */
  this.get = async function (id) {
    return memoryStorage[id];
  }

  /**
   * Remove record
   * @param {string} id
   * @returns {Promise(boolean)}
   */
  this.remove = async function (id) {
    return true;
  }
}