/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('role_permissions', function (table) {
    table.integer('role_id').unsigned().notNullable();
    table.integer('permission_id').unsigned().notNullable();

    // Tạo foreign key constraints để liên kết role_id và permission_id với các bảng tương ứng (roles và permission)
    table
      .foreign('role_id')
      .references('id_role')
      .inTable('roles')
      .onDelete('CASCADE');
    table
      .foreign('permission_id')
      .references('id_permission')
      .inTable('permission')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('role_permissions');
};
