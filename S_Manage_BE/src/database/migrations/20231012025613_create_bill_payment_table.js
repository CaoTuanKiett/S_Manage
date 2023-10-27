/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('bill_payment', function (table) {
    // table.increments('id').unsigned().primary(); // Chỉ định cột "id" làm cột chính và auto-increment
    table.integer('bill_id').unsigned().notNullable();
    table.integer('payment_id').unsigned().notNullable();
    table.decimal('amount', 10, 2).notNullable();

    table
      .foreign('payment_id')
      .references('id_payment')
      .inTable('payment')
      .onDelete('CASCADE');
    table
      .foreign('bill_id')
      .references('id_bill')
      .inTable('bill')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('bill_payment');
};
