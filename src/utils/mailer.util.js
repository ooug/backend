import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'noreply.mictesting@gmail.com', // generated ethereal user
    pass: 'qwerty@1234' // generated ethereal password
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
 * @param {{path:string}[]} attachment
 * @returns {Promise<*>}
 */
export const sendMail = (
  to,
  subject,
  text = '',
  html = '',
  attachment = []
) => {
  return new Promise((resolve, reject) => {
    transporter
      .sendMail({
        from:
          '"Odisha Oracle Users Group" <noreply.avinashvidyarthi@gmail.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html,
        attachments: attachment
      })
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
