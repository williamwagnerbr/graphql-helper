const moment = require('moment');
const uuid = require('uuid/v4');
const graphql = require('graphql');
const graphqlIso = require('graphql-iso-date');

var query = {};
var storages = {};
var factorers = {};

storages.Memory = function MemoryStorage () {
  var memoryStorage = {};

  this.set = async function (items) {
    var id = uuid();
    memoryStorage[id] = items;
    return id;
  }

  this.get = async function (id) {
    return memoryStorage[id];
  }

  this.remove = async function (id) {
    return true;
  }
}

/**
 * Search results
 * @param {string} queryName
 * @param {graphql.GraphQLType} type
 * @param {string} table
 * @returns {object}
 */
query.search = function (options) {
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
      var results = await options.dataResolve(args, info, context);
      var indexKey = await options.storage.set(results);

      return {
        index: indexKey,
        total: results.length,
        data: results
      }
    }
  }
}

query.search({
  type: AccommodationBed,
  dataResolve: async function (filters, orderBy) {
    var query = context.db('accommodation')
      .where('organization_id', context.organization_id);

    filters.forEach((filter) => {
      query = query.where(filter.column, filter.value);
    });

    return await query.orderBy('created_at', 'DESC');
  }
})

module.exports = query;
