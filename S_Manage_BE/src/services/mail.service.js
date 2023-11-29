const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const mailService = {
    async sendEmail({ emailFrom, emailTo, subject, html }) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASSWORD_USER,
            },
            
        }
        );

        await transporter.sendMail({
            from: emailFrom,
            to: emailTo,
            subject: subject,
            html: html
        });
    }
};
Object.freeze(mailService);
module.exports = { mailService };