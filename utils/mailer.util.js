const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: String(process.env.EMAIL_HOST),
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env.EMAIL_SECURE || true), // true for 465, false for other ports
  auth: {
    user: String(process.env.EMAIL_USER),
    pass: String(process.env.EMAIL_PASSWORD)
  }
})

/**
 * send mail
 * @function
 * @name sendMail
 * @param {string | string[]} to
 * @param {string} subject
 * @param {string} text
 * @param {string} html
 * @param {{path:string}[]} attachments
 * @returns {Promise<*>}
 */
const sendMail = (to, subject, text = '', html = '', attachments = []) => {
  return new Promise((resolve, reject) => {
    transporter
      .sendMail({
        from:
          // eslint-disable-next-line quotes
          `"Odisha Oracle Users Group" <${process.env.EMAIL_USER}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html,
        attachments
      })
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *
 * @param {string} to email id
 * @returns {Promise<*>}
 */
const sendOtp = (to) => {
  const otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
  return new Promise((resolve, reject) => {
    if (otp) {
      sendMail(to, 'OOUG: OTP Verification!', 'Your OTP is: ' + otp)
        .then(() => {
          resolve(otp)
        })
        .catch((err) => {
          reject(err)
        })
      resolve(otp)
    } else {
      reject(new Error('failed to send otp'))
    }
  })
}

module.exports = { sendMail, sendOtp }
