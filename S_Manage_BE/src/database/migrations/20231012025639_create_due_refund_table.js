/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('refund', function (table) {
    table.increments('id_refund').primary();
    table.integer('bill_id').unsigned().notNullable();

    // Tạo foreign key constraint để liên kết bill_id với bảng "bill"
    table
      .foreign('bill_id')
      .references('id_bill')
      .inTable('bill')
      .onDelete('CASCADE');

    table.decimal('amount', 10, 2).notNullable(); // Sử dụng kiểu dữ liệu decimal cho số tiền
    table.string('status').notNullable();
    table.dateTime('create_at').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('refund');
};
