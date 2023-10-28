\*cấu hình lại .env

1. Tạo database trong mysql trước
2. Đứng tại ...S_Manage\S_Manage_BE
3. chạy câu lệnh: npx knex migrate:latest
4. chạy câu lệnh:npx knex seed:run

cái bảng nào có chữ id trước cái thuộc tính , ví dụ bảng user có id_user e đổi thành user_id tương tự vs bảng payment có id_payment đổi thành id ra sau , do e ko biết sao chứ khóa ngoại khác tên khóa chính e tra trên mạng chèn dữ liệu vô được nhưng mà hồi get data nó lại ko ra , anh check xem thử
