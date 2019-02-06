module.exports = function (options) {
  options = options || {};
  
  if (!options.sorters) {
    options.sorters = { field: 'created_at', sort: 'asc' };
  }

  return async function (args, info, context) {
    var query = context.db(options.table)
      .where('organization_id', context.organization_id);

    /*
    filters.forEach((filter) => {
      query = query.where(filter.column, filter.value);
    });
    */

    var rows = await query.orderBy('created_at', 'DESC');
    return rows;
  }
}