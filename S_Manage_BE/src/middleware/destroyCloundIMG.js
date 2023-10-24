const cloudinaryConfig = require('../services/cloudinaryConfig');
const cloudinary = require('cloudinary').v2;

const destroyCloundIMG = (url) => {
  
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  const code = lastPart.split('.')[0]; // Loại bỏ phần mở rộng (.jpg)

  const codeSnippet = "SGManage/" + code;

  return cloudinary.uploader.destroy(codeSnippet).then ( (result) => {
    console.log('Xóa ảnh từ Cloudinary thành công:', result);
  })
  .catch( (error) => {
    console.error('Lỗi khi xóa ảnh từ Cloudinary:', error);
  })

}

module.exports = destroyCloundIMG