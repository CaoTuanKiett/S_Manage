/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('user').del()
    .then(function () {
      // Thêm dữ liệu mới vào bảng "user"
      return knex('user').insert([
        {
          name: 'Alice',
          age: 25,
          gender: 'Female',
          password: 'hashed_password',
          salt: 'salt_value',
          email: 'alice@example.com',
          username: 'alice',
          avatar: 'avatar_url',
          password_reset_token: 'reset_token',
          password_reset_expiration: new Date(),
          created_at: new Date(),
          created_by: 1,
          status: 'active',
        },
        {
          name: 'Bob',
          age: 30,
          gender: 'Male',
          password: 'hashed_password',
          salt: 'salt_value',
          email: 'bob@example.com',
          username: 'bob',
          avatar: 'avatar_url',
          password_reset_token: 'reset_token',
          password_reset_expiration: new Date(),
          created_at: new Date(),
          created_by: 2,
          status: 'active',
        },
        // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)
      ]);
    });
};
