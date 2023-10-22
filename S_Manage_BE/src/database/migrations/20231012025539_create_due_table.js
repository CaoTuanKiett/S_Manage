/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('bill', function (table) {
    table.increments('id_bill').primary();
    table.string('feetype').notNullable();
    table.decimal('fee', 10, 2).notNullable(); // Sử dụng kiểu dữ liệu decimal cho số tiền
    table.integer('payer').unsigned().notNullable();
    table.dateTime('create_at').notNullable();
    table.dateTime('create_by').notNullable();
    table.dateTime('bill_at').notNullable();
    table.string('description');

    // // Tạo foreign key constraint để liên kết user_id với bảng "user"
    // table
    //   .foreign('user_id')
    //   .references('id_user')
    //   .inTable('user')
    //   .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('bill');
};
