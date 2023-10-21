const express = require('express');
const router = express.Router();
require('dotenv').config();

const authController = require('../controllers/auth.controler');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const uploadCloud = require('../middleware/uploadIMG')

const authRouter = (app) => { 

  router.post('/register', uploadCloud.single('avatar') , authController.register); // localhost:8080/api/v1/auth/register

  router.post('/login', authController.login); // localhost:8080/api/v1/auth/login

  router.post('/forgot-password', authController.forgotPassword); //localhost:8080/api/v1/auth/forgot-password

  router.post('/reset-password', authController.resetPassword); //localhost:8080/api/v1/auth/forgot-password

  return app.use(`${process.env.API_V1}/auth`, router);
}

module.exports = authRouter;