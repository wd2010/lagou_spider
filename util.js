import crypto  from 'crypto';
export const md5Hash=(str)=>{
  if(typeof (str)!='string')return
  let md5 = crypto.createHash("md5");
  md5.update(str);
  return md5.digest('hex')
}

export const sleep=()=>{
  let t=4+Math.random()*5
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve()
    },t)
  })
}