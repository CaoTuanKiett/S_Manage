
require('dotenv').config();

const authModels = require('../models/auth.model');
const destroyCloundIMG = require('../middleware/destroyCloundIMG');


class authController {
  register = async (req, res, next) => {
    try {
      const data = req;
      const result = await authModels.register(data);
      console.log(result);
      res.status(200).json({ message: 'Register Success' ,data: result });
    } catch (error) {
      if(req.file){
        destroyCloundIMG(req.file.path);
      }
      // next(error);
      res.status(401).json({ message: 'Register Failed', error: error });
      console.log(error);
    }
  }

  login = async (req, res, next) => {
    try {
      const data = req.body;
      const result = await authModels.login(data);
      res.status(200).json({ message: 'Login Success', data: result });
    } catch (error) {
      // next(error);
      res.status(401).json({ message: 'Login Failed', error: error });
      console.log(error);
    }
  }

  forgotPassword = async (req, res, next) => {
    try {
      const data = req.body;
      const result = await authModels.forgotPassword(data);
      res.status(200).json({message: 'Send Email Success', data: result })
    } catch (error) {
      // next(error);
      res.status(401).json({ message: 'Send Email  Failed', error: error });
      console.log("errrrr",error);
    }
  }

  resetPassword = async (req, res, next) => {
    try {
      const data = req;
      const result = await authModels.ResetPassword(data);
      res.status(200).json({message: 'Reset Password Success', data: result })
    } catch (error) {
      // next(error);
      res.status(401).json({ message: 'Reset Password  Failed', error: error });
      console.log(error);
    }
  }

  
}

module.exports = new authController();