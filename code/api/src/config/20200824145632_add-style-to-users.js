
exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.string('stylePreference');
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropcolumn('stylePreference');
    })
  ]);
};
