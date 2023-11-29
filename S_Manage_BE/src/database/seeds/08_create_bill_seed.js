/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Xóa dữ liệu cũ trong bảng "bill" trước khi thêm dữ liệu mới (nếu cần)
  return knex('bill').del()
    .then(function () {
      // Thêm dữ liệu mới vào bảng "bill"
      return knex('bill').insert([
        {
          feetype: 'Late Fee',
          payer: 1, // Thay đổi tên người thanh toán (payer)
          fee: 50.00,
          create_at: new Date(),
          month: 1, // Thay đổi tháng và năm
          year: 2023,
          create_by: 'Admin', // Thay đổi người tạo
          bill_at: new Date(),
          description: 'Late payment for January',
        },
        {
          feetype: 'Penalty',
          payer: 2, // Thay đổi tên người thanh toán (payer)
          fee: 25.00,
          create_at: new Date(),
          month: 2, // Thay đổi tháng và năm
          year: 2023,
          create_by: 'Manager', // Thay đổi người tạo
          bill_at: new Date(),
          description: 'Penalty for missed deadline',
        },
        // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)
      ]);
    });
};
