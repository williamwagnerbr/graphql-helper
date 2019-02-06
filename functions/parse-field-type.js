const graphql = require('graphql');
const graphqlIso = require('graphql-iso-date');

/**
 * Create a field type
 * @param {string} type
 * @returns {graphql.GraphQLType}
 */
module.exports = function parseFieldType (type) {
  if (type === 'string') {
    return graphql.GraphQLString;
  }

  if (type === 'int') {
    return graphql.GraphQLInt;
  }

  if (type === 'float') {
    return graphql.GraphQLFloat;
  }

  if (type === 'boolean') {
    return graphql.GraphQLBoolean;
  }

  if (type === 'datetime') {
    return graphqlIso.GraphQLDateTime;
  }

  if (type === 'date') {
    return graphqlIso.GraphQLDate;
  }

  // new graphql.GraphQLNonNull(type)
  throw new TypeError('Invalid field type');
}