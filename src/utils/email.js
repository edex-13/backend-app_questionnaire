'use strict'
const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function sendMail ({ to, text, html }) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'ederson12f@gmail.com',
      pass: 'psjwycyymydzyema'
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <ederson12f@gmail.com>', // sender address
    to, // list of receivers
    subject: 'Respuestas de un cuestionario nuevo ...', // Subject line
    text, // plain text body
    html// html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
  sendMail
}
