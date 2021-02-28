const nodemailer = require("nodemailer");
console.log(process.env.USER)
console.log(process.env.HOST)
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false, 
    auth: {
      user: 'partaytracker', // generated ethereal user
      pass: 'bootcamp21', // generated ethereal password
    },
  });

  module.exports=transporter