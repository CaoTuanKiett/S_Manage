/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // seeds/create_bill_payment_seed.js
exports.seed = function (knex) {
  // Xóa dữ liệu cũ trong bảng "bill_payment" trước khi thêm dữ liệu mới (nếu cần)
  return knex('bill_payment').del()
    .then(function () {
      // Thêm dữ liệu mới vào bảng "bill_payment"
      return knex('bill_payment').insert([
        {
          bill_id: 1,
          payment_id: 1,
          amount: 50.00,
        },
        {
          bill_id: 2,
          payment_id: 2,
          amount: 25.00,
        },
        // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)
      ]);
    });
};

};
