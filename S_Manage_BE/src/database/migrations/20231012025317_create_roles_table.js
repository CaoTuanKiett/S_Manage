/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('roles', function (table) {
    table.increments('role_id').primary();
    table.string('name_role').notNullable();
    table.integer('major_id').unsigned().notNullable();

    // Tạo foreign key constraint để liên kết major_id với bảng "major"
    table
      .foreign('major_id')
      .references('major_id')
      .inTable('major')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('roles');
};
