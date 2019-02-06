const graphql = require('graphql');
const parseFieldType = require('./parse-field-type');

/*
 * Create input
 * @param {string} name
 * @param {object} fields
 * @returns {graphql.GraphQLInputObjectType}
 */
module.exports = function createInput (name, fields) {
  var def = {};

  Object.keys(fields)
    .forEach((key) => {
      def[key] = {
        type: parseFieldType(fields[key])
      }
    });

  return new graphql.GraphQLInputObjectType({
    name: name,
    fields: def
  });
}