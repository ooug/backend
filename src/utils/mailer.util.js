import nodemailer from 'nodemailer'

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
export const sendMail = (
  to,
  subject,
  text = '',
  html = '',
  attachments = []
) => {
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
