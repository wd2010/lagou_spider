import crypto  from 'crypto';
export const md5Hash=(str)=>{
  if(typeof (str)!='string')return
  let md5 = crypto.createHash("md5");
  md5.update(str);
  return md5.digest('hex')
}