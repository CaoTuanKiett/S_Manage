const cloudinary = require('cloudinary').v2;

const userModels = require('../models/user.model');

class userController {

  getAllUsers = async (req, res, next) => {
    
    try {
      const result = await userModels.selectAllUsers();
      res.status(200).json(result);
      console.log("get all users Successfully"); 

    }
    catch (err) {
      next(err);
    }
    
  }

  selectOneUser = async (req, res, next) => {
    try {
      const result = await userModels.selectOneUser(req.params.id);
      res.status(200).json(result);
      console.log("get ONE user Successfully"); 

    } catch (err) {
      next(err);
    }
  }

  createUser = async (req, res, next) => {
    try {
      const result = await userModels.createUser(req);
      res.status(200).json(result);
      console.log("createUser Successfully"); 

    } catch (err) {
      if(req.file){
        cloudinary.uploader.destroy(req.file.filename, (error, result) => {
          if (error) {
            console.error('Lỗi khi xóa ảnh từ Cloudinary:', error);
          } else {
            console.log(req.file.filename);
            console.log('Xóa ảnh từ Cloudinary thành công:', result);
          }
        });
      }
      next(err);
      console.log(err);
    }
  }

  updateUser = async (req, res, next) => {
    

    try {
      const users = await userModels.selectOneUser(req.params.id);
      const imgPre = users[0].avatar;

      const result = await userModels.updateUser(req.params.id, req);
    
      res.status(200).json(result);

      if (imgPre) {
        cloudinary.uploader.destroy(imgPre, (error, result) => {
          if (error) {
            console.error('Lỗi khi xóa ảnh từ Cloudinary:', error);
          } else {
            console.log(imgPre);
            console.log('Xóa ảnh từ Cloudinary thành công:', result);
          }
        });
      }

      console.log("updateUser Successfully"); 
    } catch (err) {
      next(err);
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const result = await userModels.deleteUser(req.params.id);
      res.status(200).json(result);
      console.log("deleteUser Successfully"); 

    } catch (err) {
      next(err);
    }
  }

  searchUser = async (req, res, next) => {
    try {
      const result = await userModels.searchUser(req.params.key);
      res.status(200).json(result);
      console.log("searchUser Successfully"); 

    } catch (err) {
      next(err);
    }
  }

}




module.exports = new userController();

