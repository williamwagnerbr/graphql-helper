const moment = require('moment');
const graphql = require('graphql');
const graphqlIso = require('graphql-iso-date');

const uuid = require('uuid/v4');

/**
 * Get all results
 * @param {string} queryName
 * @param {graphql.GraphQLType} type
 * @param {string} table
 * @returns {object}
 */
module.exports = function (queryName, type, table) {
  return {
    type: new graphql.GraphQLList(type),
    resolve: async function (args, info, context) {
      return await context.db.content(table)
        .where('organization_id', context.organization_id);
    }
  }
}