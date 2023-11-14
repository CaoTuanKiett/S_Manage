/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
 // Xóa dữ liệu cũ trong bảng "major" trước khi thêm dữ liệu mới (nếu cần)
 return knex('major').del()
 .then(function () {
   // Thêm dữ liệu mới vào bảng "major"
   return knex('major').insert([
     {
       name_major: 'Memee',
     },
     {
       name_major: 'Business Administration',
     },
     {
        name_major: 'Business Administration',
      },
     // Thêm dữ liệu cho các bản ghi khác tại đây (nếu cần)
   ]);
 });
};
