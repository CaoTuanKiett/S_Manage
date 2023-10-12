/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Xóa dữ liệu cũ trong bảng "due" trước khi thêm dữ liệu mới (nếu cần)
  return knex('due').del()
    .then(function () {
      // Thêm dữ liệu mới vào bảng "due"
      return knex('due').insert([
        {
          feetype: 'Late Fee',
          fee: 50.00,
          // user_id: 1,
          create_at: new Date(),
          due_at: new Date(),
          description: 'Late payment for January',
        },
        {
          feetype: 'Penalty',
          fee: 25.00,
          // user_id: 2,
          create_at: new Date(),
          due_at: new Date(),
          description: 'Penalty for missed deadline',
        },
        // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)
      ]);
    });
};
