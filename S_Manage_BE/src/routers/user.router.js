const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controler');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const uploadCloud = require('../middleware/uploadIMG');
const checkAvatar = require('../middleware/checkAvatar');
const checkPermission = require('../middleware/checkPermission').checkRoleHasPermission;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploadCloud.single('avatar'));
// set permission : 1: view user
//                  2: create user
//                  3: update user
//                  4: delete user

const userRouter = (app) => {
  
  router.get('/users',checkPermission(1), awaitHandlerFactory(userController.getAllUsers)); // localhost:8080/api/v1/users

  router.get('/users/:id', checkPermission(1), awaitHandlerFactory(userController.selectOneUser)); // localhost:8080/api/v1/users/1

  router.post('/users', checkPermission(2), uploadCloud.single('avatar') , userController.createUser); // localhost:8080/api/v1/users

  router.put('/users/:id', checkPermission(3), uploadCloud.single('avatar') , userController.updateUser); // localhost:8080/api/v1/users/1 , using patch for partial update

  router.delete('/users/:id', checkPermission(4), userController.deleteUser); // localhost:8080/api/v1/users/1

  router.get('/users/search/:key', userController.searchUser); // localhost:8080/api/v1/users/search/key


  return app.use('/api/v1', router);
}


module.exports = userRouter;