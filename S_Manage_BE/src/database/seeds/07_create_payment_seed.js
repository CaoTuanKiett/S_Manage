/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Xóa dữ liệu cũ trong bảng "payment" trước khi thêm dữ liệu mới (nếu cần)
  return knex('payment').del()
    .then(function () {
      // Thêm dữ liệu mới vào bảng "payment"
      return knex('payment').insert([
        {
          user_id: 1,
          pay_account: '1234567890',
          pay_method: 'Credit Card',
          create_at: new Date(),
          account_name: 'John Doe',
          credit_card_first: '1234',
          credit_card_last: '5678',
          account_number: '1234-5678-9012-3456',
        },
        {
          user_id: 2,
          pay_account: '9876543210',
          pay_method: 'PayPal',
          create_at: new Date(),
          account_name: 'Jane Smith',
          credit_card_first: null,
          credit_card_last: null,
          account_number: 'jane@example.com',
        },
        // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)
      ]);
    });
};
