/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('bill', function (table) {
    table.increments('id_bill').primary();
    table.string('feetype').notNullable();
    table.string('payer').notNullable();
    table.decimal('fee', 10, 2).notNullable(); 
    table.dateTime('create_at').notNullable();
    table.dateTime('create_by').notNullable();
    table.dateTime('bill_at').notNullable();
    table.string('description');

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('bill');
};
