/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payment', function (table) {
    table.increments('id_payment').primary();
    table.integer('user_id').unsigned().notNullable();
    table.string('pay_method').notNullable();
    table.dateTime('create_at').notNullable();
    table.string('account_name');
    table.string('account_number').notNullable();
    table.string('amount_money').notNullable();
    table.string('description');

    // Tạo foreign key constraint để liên kết user_id với bảng "user"
    table
      .foreign('user_id')
      .references('id_user')
      .inTable('user')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('payment');
};
