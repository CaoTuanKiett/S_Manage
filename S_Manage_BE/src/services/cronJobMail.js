const cron = require('node-cron');
const nodemailer = require('nodemailer');

const mailModel = require('../models/mail.model');
const userModel = require('../models/user.model')
const { mailService } = require('../services/mail.service');

// Tạo một cron job chạy vào ngày đầu của mỗi tháng
cron.schedule('0 0 2 * *', async () => {

  const listUsers = await mailModel.fetchOutstandingBills();

  // Nội dung HTML cho email
  const emailHTML = `
    <html>
    <body style="display: flex; justify-content: center; align-items: center;">
    <div  style="display: flex; justify-content: center; align-items: center; padding: 40px;">

    <div>
      <h1 style="font-weight: 700; font-size: 30px; text-transform: uppercase; padding-bottom: 20px; ">Thông báo về việc thanh toán</h1>
      <p style="font-size: 17px;">Xin chào <span style="font-weight: 600;">[tên người dùng]</span> !</p>
      <p style="font-size: 17px;">Chúng tôi đã nhận thấy rằng bạn chưa thanh toán trong <span style="font-size: 20px; font-weight: 600;">[số tháng chưa thanh toán]  tháng.</span></p>
      <p style="font-size: 17px;">Vui lòng thanh toán không là bị kick</p>
      <p style="font-size: 17px;">Chị Trinh đã xemm...</p>

      <h2  style="font-weight: 700; font-size: 17px; padding-top: 20px;" >From</h2>
      <p style="font-weight: 600; font-size: 20px; text-transform: uppercase; display: flex; align-items:center ; padding-top: 10px;"> 
        <img
        style="width: 30px; padding-right: 5px;"
        src="https://res.cloudinary.com/dgbkbpog4/image/upload/v1698812122/SGManage/losdac_hvnwch.png" alt="logo">
        S-GROUP
      </p>
      
    </div>
    
    <div 
      style="width: 200px; height: 200px; padding-left: 20px;" 
      >
        <img 
          style="border-radius: 50%; width: 100%;height: 100%;" 
          src="[avatar]" atl='avt' 
        />
    </div>

</div>
    </body>
    </html>
    `;


  for (const key in listUsers) {
    
    const user = listUsers[key];

    if (user.unpaidMonths >= 1) {
      const mailOptions = {
        emailFrom: 'your-email@gmail.com',
        emailTo: user.email,
        subject: 'Thông báo về việc thanh toán',
        html: emailHTML.replace('[tên người dùng]', user.name).replace('[số tháng chưa thanh toán]', user.unpaidMonths.toString()).replace('[avatar]', user.avatar),
      };

    try {
      // Gửi email
      const info = await mailService.sendEmail(mailOptions);
      if (info && info.response) {
        console.log('Email đã được gửi: ' + info.response);
      } else {
        console.log('Không có thông tin gửi email.');
      }
    } catch (error) {
      console.log('Lỗi gửi email: ' + error);
    }

  }
}

  
});

cron.schedule('0 0 5 * *', async () => {

  const DataUsers = await userModel.selectAllUsers();

  // Nội dung HTML cho email
  const emailHTML = `
    <html>
    <body style="display: flex; justify-content: center; align-items: center;">
    <div  style="display: flex; justify-content: center; align-items: center; padding: 40px;">

    <div>
      <h1 style="font-weight: 700; font-size: 30px; text-transform: uppercase; padding-bottom: 20px; ">Thông báo về việc thanh toán</h1>
      <p style="font-size: 17px;">Xin chào <span style="font-weight: 600;">[tên người dùng]</span> !</p>
      <p style="font-size: 17px;">Mail này thông báo đã đến ngày đóng tiền hàng tháng !!!!!!!!</span></p>
      <p style="font-size: 17px;">Vui lòng thanh toán không là bị kick</p>
      <p style="font-size: 17px;">Chị Trinh đã xemm...</p>

      <h2  style="font-weight: 700; font-size: 17px; padding-top: 20px;" >From</h2>
      <p style="font-weight: 600; font-size: 20px; text-transform: uppercase; display: flex; align-items:center ; padding-top: 10px;"> 
        <img
        style="width: 30px; padding-right: 5px;"
        src="https://res.cloudinary.com/dgbkbpog4/image/upload/v1698812122/SGManage/losdac_hvnwch.png" alt="logo">
        S-GROUP
      </p>
      
    </div>
    
    <div 
      style="width: 200px; height: 200px; padding-left: 20px;" 
      >
        <img 
          style="border-radius: 50%; width: 100%;height: 100%;" 
          src="[avatar]" atl='avt' 
        />
    </div>

    </div>
        </body>
        </html>
        `;


        for (const key in DataUsers) {
    
          const user = DataUsers[key];
      
          if (user.status == 'active') {
            const mailOptions = {
              emailFrom: 'your-email@gmail.com',
              emailTo: user.email,
              subject: 'Thông báo về việc thanh toán',
              html: emailHTML.replace('[tên người dùng]', user.name).replace('[avatar]', user.avatar),
            };
      
          try {
            // Gửi email
            const info = await mailService.sendEmail(mailOptions);
            if (info && info.response) {
              console.log('Email đã được gửi: ' + info.response);
            } else {
              console.log('Không có thông tin gửi email.');
            }
          } catch (error) {
            console.log('Lỗi gửi email: ' + error);
          }
      
        }}

} );




module.exports = cron;