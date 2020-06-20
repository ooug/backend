export const generateOTP = ()=>{
  let otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  return new Promise((resolve,reject)=>{
    if(otp){
      resolve(otp);
    }else{
      reject();
    }
  })
}