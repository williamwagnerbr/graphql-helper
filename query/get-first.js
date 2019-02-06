const moment = require('moment');
const graphql = require('graphql');
const graphqlIso = require('graphql-iso-date');

const uuid = require('uuid/v4');

/**
 * Return GrahpQL Query
 * @param {object} options
 * @returns {object}
 */
module.exports = function (options) {
  return {
    args: {},
    resolve: async function () {
      // Code here
    }
  }
}