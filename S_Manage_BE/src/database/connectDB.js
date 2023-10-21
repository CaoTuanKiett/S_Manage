const knex = require('knex');
const config = require('../../knexfile');

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

db.raw('SELECT 1 as result')
  .then(() => {
    console.log('Kết nối CSDL thành công');
  })
  .catch((error) => {
    console.error('Lỗi kết nối CSDL:', error);
  });

// // Ví dụ truy vấn
// db('users').select('*')
//   .then((users) => {
//     console.log("loggfg",users);
//   })
//   .catch((error) => {
//     console.error('Lỗi khi truy vấn cơ sở dữ liệu:', error);
//   });

module.exports = db;