/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Xóa dữ liệu cũ trong bảng "user_roles" trước khi thêm dữ liệu mới (nếu cần)
  return knex('user_roles').del()
    .then(function () {
      // Thêm dữ liệu mới vào bảng "user_roles"
      return knex('user_roles').insert([
        {
          user_id: 1,
          role_id: 1,
        },
        {
          user_id: 2,
          role_id: 2,
        },
        // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)
      ]);
    });
};
