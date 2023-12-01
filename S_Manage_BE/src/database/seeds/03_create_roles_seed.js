/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Xóa dữ liệu cũ trong bảng "roles" trước khi thêm dữ liệu mới (nếu cần)
  return knex('roles').del()
    .then(function () {
      // Thêm dữ liệu mới vào bảng "roles"
      return knex('roles').insert([
        {
          name_role: 'Admin',
          major_id: 3,
        },
        {
          name_role: 'BNB',
          major_id: 3,
        },
        {
          name_role: 'Member',
          major_id: 1,
        },
        {
          name_role: 'User',
          major_id: 2,
        },
        
        // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)

        
      ]);
    });
};
