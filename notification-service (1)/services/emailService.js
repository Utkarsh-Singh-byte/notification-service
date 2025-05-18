const nodemailer = require('nodemailer');

exports.send = async (notification) => {
  const transporter = nodemailer.createTransport({ jsonTransport: true });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: 'user@example.com',
    subject: notification.subject,
    text: notification.message
  });
};
