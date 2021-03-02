require("dotenv").config();
const nodemailer = require("nodemailer");
console.log("user", process.env.USER2);

console.log(process.env.HOST);
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  secure: false,
  auth: {
    user: process.env.USER2, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

const emailData = (to, subject, html) => {
  return {
    from: "Partay Tracker <partytracker@gmail.com>", // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  };
};

module.exports = {
  transporter,
  emailData,
};
