import nodemailer from 'nodemailer'
import config from '../config/config.js'

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Nutriva Team" <${config.EMAIL_USER}>`,
    to,
    subject,
    text,
  })
}

export default sendEmail
