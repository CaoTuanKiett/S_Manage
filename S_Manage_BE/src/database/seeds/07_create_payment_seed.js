/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Xóa dữ liệu cũ trong bảng "payment" trước khi thêm dữ liệu mới (nếu cần)
  return knex('payment').del()
    .then(function () {
      // Thêm dữ liệu mới vào bảng "payment"
      return knex('payment').insert([
        {
          user_id: 1,
          pay_method: 'Credit Card',
          pay_account:"john doe",
          create_at: new Date(),
          account_name: 'John Doe',
          account_number: '1234-5678-9012-3456',
          amount_money: 200000,
          description: "em Doe nop tien thang 10"
        },
        {
          user_id: 2,
          pay_method: 'PayPal',
          pay_account: "thanhviet",
          create_at: new Date(),
          account_name: 'Jane Smith',
          account_number: 'jane@example.com',
          amount_money: 400000,
          description: "em Smith nop tien thang 11"
        },
        // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)
      ]);
    });
};
