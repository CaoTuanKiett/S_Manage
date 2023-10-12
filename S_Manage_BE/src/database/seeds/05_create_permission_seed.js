/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Xóa dữ liệu cũ trong bảng "permission" trước khi thêm dữ liệu mới (nếu cần)
  return knex('permission').del()
    .then(function () {
      // Thêm dữ liệu mới vào bảng "permission"
      return knex('permission').insert([
        {
          name_permission: 'Read',
        },
        {
          name_permission: 'Write',
        },
        // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)
      ]);
    });
};
