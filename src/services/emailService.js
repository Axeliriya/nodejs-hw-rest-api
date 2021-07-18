const nodemailer = require('nodemailer');

class EmailService {
  async sendEmail(verifyToken, email, name) {
    const transporter = nodemailer.createTransport(
      {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
          user: 'testcontactsmailer@mail.ru',
          pass: 'SendEmail91!',
        },
      },
      { from: 'Test Mailer <testcontactsmailer@mail.ru>' },
    );
    await transporter.sendMail({
      to: email,
      subject: '✔ Congratulations! You are successfully registred on our site',
      text: `Hi, ${name}! Click to verify http://localhost:4040/api/users/verify/${verifyToken}`,
      html: `<b>Hi, ${name}!</b> <a href="http://localhost:4040/api/users/verify/${verifyToken}">Click to verify</a>`,
    });
  }
}

module.exports = EmailService;
