/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payment', function (table) {
    table.increments('id_payment').primary();
    table.integer('user_id').unsigned().notNullable();
    table.string('pay_account').notNullable();
    table.string('pay_method').notNullable();
    table.dateTime('create_at').notNullable();
    table.string('account_name');
    table.string('credit_card_first');
    table.string('credit_card_last');
    table.string('account_number').notNullable();

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
