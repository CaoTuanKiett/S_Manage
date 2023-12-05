const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');


const knex = require('../database/connectDB');
const mailMiddlware = require('../middleware/mail.middleware');
const { mailService } = require('../services/mail.service');
const userModel = require('./user.model');
const uploadCloud = require('../middleware/uploadIMG')


const avtDefault = "https://i.pinimg.com/564x/a5/b0/2b/a5b02b135dd9e57d89b9eef24d438bbb.jpg";


const {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken
} = require('../middleware/hash');

class authModels {
  tableName = 'user';
  idUser = 'id_user';
  name = 'name';
  age = 'age';
  gender = 'gender';
  phone = 'phone';
  address = 'address';
  email = 'email';
  username = 'username';
  password = 'password';
  salt = 'salt';
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
          let fileImg = null;

          if (dataImg) {
            fileImg = dataImg.path;
          } else {
            fileImg = avtDefault;
          }

          const { salt, hashedPassword } = hashPassword(data.password);
          const idUser = knex(this.tableName).insert({
            // idUser: data.idUser,
            name: data.name,
            age: data.age,
            phone: data.phone,
            address: data.address,
            gender: data.gender,
            email: data.email,
            username: data.username,
            password: hashedPassword,
            salt: salt,
            avatar: fileImg,
          }).then((idUser) => {
            knex('user_roles').insert({
              user_id: idUser,
              role_id: 3,
            }).catch( (e) => {
              console.log(e);
            })
            return idUser;
          });
        }
      }
      );
  }

  login = (data) => {
    return knex(this.tableName)
      .join('user_roles', 'user.id_user', "user_roles.user_id")
      .join('roles', 'user_roles.role_id', 'roles.id_role')
      .where(this.username, data.username).then((result) => {
        if (result.length > 0) {
          const account = result[0];
          if (comparePassword(account.password, account.salt, data.password)) {
            const payload = {
              idUser: account.id_user,
              username: account.username,
              email: account.email,
              phone: account.phone,
              address: account.address,
              avatar: account.avatar,
              role: account.role_id,
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

  updateUserForgotPass = (id, data) => {
    return knex(this.tableName)
      .where(this.idUser, id)
      .update({
        name: data.name,
        age: data.age,
        gender: data.gender,
        phone: data.phone,
        address: data.address,
        salt: data.salt,
        email: data.email,
        username: data.username,
        password: data.password,
        avatar: data.avatar,
        password_reset_token: data.passwordResetToken,
        password_reset_expiration: data.passwordResetExpiration,
        createdBy: data.created_by,
        createdAt: data.created_at,
        status: data.status,
      })
      .then(result => {
        console.log('Câu truy vấn thành công:', result);
      })
      .catch(error => {
        console.error('Lỗi khi thực hiện câu truy vấn:', error)
      });
  }

  updateResetPassword = (id, data) => {
    const { salt, hashedPassword } = hashPassword(data.password);

    return knex(this.tableName)
      .where(this.idUser, id)
      .update({
        name: data.name,
        age: data.age,
        gender: data.gender,
        phone: data.phone,
        address: data.address,
        password: hashedPassword,
        salt: salt,
        email: data.email,
        username: data.username,
        avatar: data.avatar,
        password_reset_token: data.password_reset_token,
        password_reset_expiration: data.password_reset_expiration,
        createdBy: data.createdBy,
        createdAt: data.createdAt,
        status: data.status,
      })
      .then(result => {
        console.log('Câu truy vấn thành công:', result);
      })
      .catch(error => {
        console.error('Lỗi khi thực hiện câu truy vấn:', error)
      });
  }



  forgotPassword = async (data) => {

    const mailTo = data[0].email;
    console.log(mailTo);
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

    // Update user
    const dataUser = {
      name: user.name,
      age: user.age,
      gender: user.gender,
      phone: user.phone,
      address: user.address,
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

    this.updateUserForgotPass(user.id_user, dataUser)
      .then(result => {
        // Gửi email ở đây sau khi cập nhật thành công
        const resetUrl = `${process.env.BASE_URL}/api/v1/auth/reset-password?token=${token}`;
        const resetUrl2 = `${process.env.BASE_URL_FE}/resetPassword?token=${token}`;

        const mailOptions = {
          emailFrom: process.env.EMAIL_USER,
          emailTo: mailTo,
          subject: "Password reset requested",
          html: `
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a 
                  href="${resetUrl2}" 
                  style="
                    background-color: #072541; 
                    border: none;
                    color: white;
                    padding: 16px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
                    border-radius: 4px;
                    color: white; 
                    border: 2px solid #5272F2;
                    "
                    onmouseover="this.style.backgroundColor = '#5272F2'; this.style.color = 'white';"
                    onmouseout="this.style.backgroundColor = '#072541'; this.style.color = 'white';"
                >
                    Reset Password Now
                </a>
              `,
        };


        return mailService.sendEmail(mailOptions);
      })
      .then(() => {
        console.log('Password reset and email sent successfully' );
        // return Promise.reject({ message: 'Password reset and email sent successfully' });
      })
      .catch(error => {
        console.error(error);
        return Promise.reject({ message: "Failed to send email" });
      });
  }


  async ResetPassword(data) {
    const token = data.query.token;
    const passwordNew = data.body.passwordNew;

    if (!token) {
      return res.status(400).json({ error: 'Missing token in the request' });
    }

    const decodedToken = verifyToken(token);

    const dateNow = Date.now();
    const email = decodedToken.email

    const users = await userModel.selectOneMail(email);
    const user = users[0];

    if (!user && dateNow < decodedToken.passwordResetExpires) {
      return res.status(401).json({ error: 'Invalid or expired password reset token' });
    }

    // Update user
    const dataUser = {
      name: user.name,
      age: user.age,
      gender: user.gender,
      phone: user.phone,
      address: user.address,
      email: user.email,
      username: user.username,
      password: passwordNew,
      avatar: user.avatar,
      password_reset_token: null,
      password_reset_expiration: null,
      created_at: user.created_at,
      created_by: user.created_by,
      status: user.status
    }

    this.updateResetPassword(user.id_user, dataUser)
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
        console.log( 'Password reset and email sent successfully');
        // return Promise.reject({ message: 'Password reset and email sent successfully' });
      })
      .catch(error => {
        console.error(error);
        console.log("Failed to send email");
        // return Promise.reject({ message: "Failed to send email" });
      });

  }



}

module.exports = new authModels();