/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Xóa dữ liệu cũ trong bảng "refund" trước khi thêm dữ liệu mới (nếu cần)
  return knex('refund').del()
    .then(function () {
      // Thêm dữ liệu mới vào bảng "refund"
      return knex('refund').insert([
        {
          payment_id: 1,
          amount: 25.00,
          status: 'Refunded',
          create_at: new Date(),
        },
        {
          payment_id: 2,
          amount: 10.00,
          status: 'Refunded',
          create_at: new Date(),
        },
        // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)
      ]);
    });
};
