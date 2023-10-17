const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');


const knex = require('../database/connectDB');
const mailMiddlware = require('../middleware/mail.middleware');
const { mailService } = require('../services/mail.service');
const userModel = require('./user.model');

const  avtDefault = path.join(__dirname, 'assets', 'avtDefault.jpg');


const {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  unlockPassword
} = require('../middleware/hash');
const { hash } = require('bcrypt');

class authModels { 
  tableName = 'user';
  idUser = 'id_user';
  name = 'name';
  age = 'age';
  gender = 'gender';
  salt = 'salt';
  email = 'email';
  username = 'username';
  password = 'password';
  avatar = 'avatar';
  passwordResetToken = 'password_reset_token';
  passwordResetExpiration = 'password_reset_expiration';
  createdAt = 'created_at';
  createdBy = 'created_by';
  status = 'status';


  register = (dataFile) => {
    const data = dataFile.body;
    const dataImg = dataFile.file;
    return knex(this.tableName)
      .where(this.username, data.username)
      .orWhere(this.email, data.email)
      .then((result) => {
      if (result.length > 0) {
        return Promise.reject({ message: 'Username already exists' });
      } else {
        let fileImg = dataImg.path;
        const { salt, hashedPassword } = hashPassword(data.password);
        return knex(this.tableName).insert({
          // idUser: data.idUser,
          name: data.name,
          age: data.age,
          gender: data.gender,
          email: data.email,
          username: data.username,
          password: hashedPassword,
          salt: salt,
          avatar: fileImg || avtDefault, 
        });
      }
    }
    );
  }

  login = (data) => {
    return knex(this.tableName).where(this.username, data.username).then((result) => {
      if (result.length > 0) {
        const account = result[0];
        if (comparePassword(account.password, account.salt, data.password)) {
          const payload = {
            idUser: account.idUser,
            username: account.username,
            email: account.email,
            avatar: account.avatar  
          };
          const token = generateToken(payload);

          return Promise.resolve(token);
        } else {
          return Promise.reject({ message: 'Wrong password' });
        }
      } else {
        return Promise.reject({ message: 'Username does not exist' });
      }
    });
  }

  

  forgotPassword = async (data) => { 
   
    const mailTo  = data.email;
    console.log("mailTo", mailTo);
    // Lấy thông tin user từ email
    const users = await userModel.selectOneMail(mailTo);
    const user = users[0];
    if (!user) {
        return Promise.reject({ message: "Email not found" });
    }

    const payloadUser = {
      idUser: user.id_user,
      username: user.username,
      email: user.email
    };


    const token = generateToken(payloadUser);

    const time = new Date(Date.now() + 10 * 60 * 1000);

    console.log('user', user);
    
    console.log(user.id_user);
    // Update user
    const dataUser = {
      name: user.name,
      age: user.age,
      gender: user.gender,
      email: user.email,
      username: user.username,
      password: user.password,
      salt: user.salt,
      avatar: user.avatar,
      passwordResetToken: token,
      passwordResetExpiration: time,
      createdAt: user.created_at,
      createdBy: user.created_by,
      status: user.status

    }

    console.log('dataUser', dataUser);

    
    
    userModel.updateUserForgotPass(user.id_user ,dataUser);


    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASSWORD_USER,
      },
    });

    const resetUrl = `http://localhost:8080/api/v1/auth/reset-password?token=${token}`;

    const mailOptions = {
        emailFrom: process.env.EMAIL_USER,
        emailTo: mailTo,
        subject: "Password reset requested",
        html: `
              <p>You requested a password reset. Click the link below to reset your password:</p>
              <a href="${resetUrl}">${resetUrl}</a>
            `,
    };

    try {
        await mailService.sendEmail(mailOptions);
        return Promise.reject({ message: "Email sent successfully" });
    }
    catch (error) {
        console.log(error);
        return Promise.reject({ message: "Failed to send email" });
    }
  }


    async ResetPassword(data) {
      const token = data.query.token;

      const passwordNew = data.body.password;

      if (!token) {
        return res.status(400).json({ error: 'Missing token in the request' });
      }

      const decodedToken = verifyToken(token);

      const dateNow = Date.now();
      const email = decodedToken.email

      const users = await userModel.selectOneMail(email);
      const user = users[0];

      console.log(dateNow < decodedToken.passwordResetExpires);

      if (!user && dateNow < decodedToken.passwordResetExpires) {
        return res.status(401).json({ error: 'Invalid or expired password reset token' });
      }

      // Update user
      const dataUser = {
        name: user.name,
        age: user.age,
        gender: user.gender,
        email: user.email,
        username: user.username,
        password: data.body.password,
        avatar: user.avatar,
        password_reset_token: null,
        password_reset_expiration: null,
        created_at: user.created_at,
        created_by: user.created_by,
        status: user.status
      }
      
      // await userModel.updateResetPassword(user.id_user ,dataUser);

      // const mailOptions = {
      //   emailFrom: process.env.EMAIL_USER,
      //   emailTo: user.email,
      //   subject: 'Password Reset Confirmation',
      //   html: `
      //     <p>Your password has been successfully reset. If you did not initiate this request, please contact us immediately.</p>
      //   `,
      // };


      
  
      // try {
      //     await mailService.sendEmail(mailOptions);
      //     return Promise.reject({ message: "Email sent successfully" });
      // }
      // catch (error) {
      //     console.log(error);
      //     return Promise.reject({ message: "Failed to send email" });
      // }

      // Cập nhật thông tin người dùng và kiểm tra kết quả
    userModel.updateResetPassword(user.id_user, dataUser)
    .then(result => {
      // Gửi email ở đây sau khi cập nhật thành công
      const mailOptions = {
        emailFrom: process.env.EMAIL_USER,
        emailTo: user.email,
        subject: 'Password Reset Confirmation',
        html: `
          <p>Your password has been successfully reset. If you did not initiate this request, please contact us immediately.</p>
        `,
      };

      return mailService.sendEmail(mailOptions);
    })
    .then(() => {
      return Promise.reject({ message: 'Password reset and email sent successfully' });
    })
    .catch(error => {
      console.error(error);
      return Promise.reject({ message: "Failed to send email" });
    });

  } 




}

module.exports = new authModels();