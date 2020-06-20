import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'noreply.avinashvidyarthi@gmail.com', // generated ethereal user
    pass: '', // generated ethereal password
  },
});

export const sendMail =  (to:string | string[], subject: string, text: string) => {
  return new Promise((resolve,reject)=>{
    transporter.sendMail({
      from: '"Odisha Oracle Users Group" <noreply.avinashvidyarthi@gmail.com>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
    }).then((data)=>{
      resolve(data);
    }).catch((err)=>{
      reject(err);
    })
  })
};
