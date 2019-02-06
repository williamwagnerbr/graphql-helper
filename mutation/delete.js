const moment = require('moment');
const uuid = require('uuid/v4');
const graphql = require('graphql');
const graphqlIso = require('graphql-iso-date');

const createInput = require('../functions/create-input');

/**
 * Factory a delete mutation
 * @param {string} mutationName
 * @param {string} type
 * @param {object} options
 * @returns {function} 
 */
module.exports = function (mutationName, type, options) {
  return {
    type: type,
    args: {
      id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString)
      }
    },
    resolve: async function (parent, args, context) {
      var organizationId = context.organization_id;
      var accountId = context.account_id;

      var db = context.db.content;
      var permissions = context.permissions;

      var now = moment.utc();
      var recordId = args.id;

      var record = await db(options.table)
        .where('id', recordId)
        //.where('organization_id', organizationId)
        .first();

      if (!record) {
        return null;
      }

      await db(options.table).where('id', recordId)
        .delete();

      return record;
    }
  }
}