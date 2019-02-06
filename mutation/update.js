const moment = require('moment');
const uuid = require('uuid/v4');
const graphql = require('graphql');
const graphqlIso = require('graphql-iso-date');

const createInput = require('../functions/create-input');

/**
 * Factory a update mutation
 * @param {string} mutationName
 * @param {string} type
 * @param {object} options
 * @returns {function}
 */
module.exports = function (mutationName, type, options) {
  return {
    type: new graphql.GraphQLNonNull(type),
    args: {
      id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString)
      },
      data: {
        type: new graphql.GraphQLNonNull(createInput(`${mutationName}Input`, options.fields)),
      }
    },
    resolve: async function (parent, args, context) {
      throw new Error('Not available yet.');
    }
  }
}