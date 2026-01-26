import nodemailer from 'nodemailer'
import config from '../config/config.js'

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
})
  await transporter.sendMail({
    from: `"Nutriva Team" <${config.EMAIL_USER}>`,
    to,
    subject,
    text,
  })
}

export default sendEmail