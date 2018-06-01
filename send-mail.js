const nodemailer = require('nodemailer');
require('dotenv').config();

function sendMail(req, res) {

  console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;
  const currency = req.body.currency;

  const smtpConfig = {
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS
    }
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  const mailOptions = {
    from: `"Binary options trading platform" <${email}>`,
    to: email,
    subject: 'Congratulations, you succesfully registred your account',
    html: 
    `
    <div><bold>Your email: <bold>${email}</bold></div>
    <div><bold>Your password: <bold>${password}</bold></div>
    <div><bold>Your currency: <bold>${currency}</bold></div>
    `
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.json({
        status: error.statusCode
      });
    } else {
      res.send({
        status: 200,
        data: info
      });
    }
  });
}

module.exports = sendMail;