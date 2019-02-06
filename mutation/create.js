const moment = require('moment');
const uuid = require('uuid/v4');
const graphql = require('graphql');
const graphqlIso = require('graphql-iso-date');

const createInput = require('../functions/create-input');

/**
 * Factory a create mutation
 * @param {string} mutationName
 * @param {graphql.GraphQLType} type
 * @param {object} options
 * @returns {function}
 */
module.exports = function (mutationName, type, options) {
  return {
    type: new graphql.GraphQLNonNull(type),
    args: {
      data: {
        type: new graphql.GraphQLNonNull(createInput(`${mutationName}Input`, options.fields))
      }
    },
    resolve: async function (parent, args, context) {
      var organizationId = context.organization_id;
      var accountId = context.account_id;

      var db = context.db.content;
      var permissions = context.permissions;

      var now = moment.utc();
      var data = args.data;

      var recordId = uuid();
      var record = {};

      Object.keys(options.fields).forEach(function (key) {
        record[key] = data[key];
      });

      if (options.organization_id) {
        record.organization_id = organizationId;
      }

      if (options.created_by) {
        record.created_by = accountId;
      }

      if (options.account_id) {
        record.account_id = accountId;
      }

      if (options.created_at) {
        record.created_at = now.format('YYYY-MM-DD HH:mm:ss');
      }

      if (options.updated_at) {
        record.updated_at = now.format('YYYY-MM-DD HH:mm:ss');
      }

      record.id = recordId;

      if (options.overwriting) {
        record = Object.assign({}, record, options.overwriting);
      }

      await db(options.table)
        .insert(record);

      return await db(options.table)
        .where('id', recordId)
        .first();
    }
  }
}