/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Xóa dữ liệu cũ trong bảng "role_permissions" trước khi thêm dữ liệu mới (nếu cần)
  return knex('role_permissions').del()
    .then(function () {
      // Thêm dữ liệu mới vào bảng "role_permissions"
      return knex('role_permissions').insert([
        {
          role_id: 1,
          permission_id: 1,
        },
        {
          role_id: 2,
          permission_id: 2,
        },
        // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)
      ]);
    });
};
