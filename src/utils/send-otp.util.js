import { sendMail } from './mailer.util'

/**
 *
 * @param {string} to email id
 * @returns {Promise<*>}
 */
export const sendOTP = (to) => {
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
