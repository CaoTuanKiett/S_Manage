/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_roles', function (table) {
    // table.increments(); // Tự động tạo cột "id" với auto-increment
    table.integer('user_id').unsigned().notNullable();
    table.integer('role_id').unsigned().notNullable();

    // Tạo các foreign key constraints để liên kết user_id và role_id với các bảng khác (user và roles)
    table
      .foreign('user_id')
      .references('id_user')
      .inTable('user')
      .onDelete('CASCADE');
    table
      .foreign('role_id')
      .references('id_role')
      .inTable('roles')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('user_roles');
};
