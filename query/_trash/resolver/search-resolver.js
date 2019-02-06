module.exports = function (options) {
  return async function (filters, orderBy) {
    var query = context.db('accommodation')
      .where('organization_id', context.organization_id);

    filters.forEach((filter) => {
      query = query.where(filter.column, filter.value);
    });

    var rows = await query.orderBy('created_at', 'DESC');

    return rows;
  }
}