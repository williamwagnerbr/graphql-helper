const moment = require('moment');
const graphql = require('graphql');
const graphqlIso = require('graphql-iso-date');

const uuid = require('uuid/v4');

/**
 * Search results
 * @param {string} queryName
 * @param {graphql.GraphQLType} type
 * @param {string} table
 * @returns {object}
 */
module.exports = function (queryName, type, table) {
  const responseType = new graphql.GraphQLObjectType({
    name: `${queryName}DataSet`,
    fields: {
      key: {
        type: graphql.GraphQLString
      },
      total: {
        type: graphql.GraphQLInt
      },
      data: {
        type: new graphql.GraphQLList(type)
      }
    }
  });

  return {
    type: responseType,
    resolve: async function (args, info, context) {
      var result = await context.db.content(table)
        .where('organization_id', context.organization_id);

      return {
        key: uuid(),
        total: result.length,
        data: result
      }
    }
  }
}