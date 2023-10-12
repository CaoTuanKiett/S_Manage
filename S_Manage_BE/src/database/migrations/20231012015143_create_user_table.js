/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id_user').primary();
    table.string('name');
    table.integer('age');
    table.string('gender');
    table.string('password');
    table.string('salt');
    table.string('email');
    table.string('username');
    table.string('avatar');
    table.string('password_reset_token');
    table.dateTime('password_reset_expiration');
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.integer('created_by');
    table.string('status');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
