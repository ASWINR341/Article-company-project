"use strict";

const nodemailer = require("nodemailer");

exports.sendMail = async (email, password) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
      user: "aswinr2410@gmail.com",
      pass: "2WKO0RFhgscjQ39Z"
    }
  });

  await transporter.sendMail({
    from: '"Aswin R" <aswin@company.com>',
    to: email,
    subject: "Account has been created",
    text: "Your password is " + password
  });
};
