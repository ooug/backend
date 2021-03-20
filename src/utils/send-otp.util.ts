import { sendMail } from './mailer.util';

export const sendOTP = (to:string) => {
  let otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  return new Promise((resolve, reject) => {
    if (otp) {
      sendMail(to, 'OOUG: OTP Verification!', 'Your OTP is: ' + otp)
        .then((data) => {resolve(otp)})
        .catch((err) => {reject(err)});
      resolve(otp);
    } else {
      reject();
    }
  });
};
