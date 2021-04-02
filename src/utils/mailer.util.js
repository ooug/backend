import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'noreply.mictesting@gmail.com',
    pass: 'qwerty@1234'
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
          '"Odisha Oracle Users Group" <noreply.avinashvidyarthi@gmail.com>', // sender address
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
