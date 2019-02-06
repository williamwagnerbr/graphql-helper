const moment = require('moment');
const uuid = require('uuid/v4');
const graphql = require('graphql');
const graphqlIso = require('graphql-iso-date');

/**
 * Search results
 * @param {string} queryName
 * @param {graphql.GraphQLType} type
 * @param {string} table
 * @returns {object}
 */
module.exports = function (options) {
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
        //type: new graphql.GraphQLList(options.responseType)
        type: new graphql.GraphQLList(options.type)
      }
    }
  });

  return {
    type: responseType,
    resolve: async function (args, info, context) {
      // Interpret filters
      //...
      
      // Data resolver
      var results = await options.resolve(args, info, context);

      // Store results
      var indexKey = await options.storage.set(results);

      return {
        index: indexKey,
        total: results.length,
        data: results
      }
    }
  }
}
