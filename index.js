require('babel-polyfill')
require('babel-register')({
  presets: ['env', 'stage-0'],
});

let parse = require('./spider/parse.js');
let requestUrl = require('./spider/requestUrl.js');
let baseUrl='https://www.lagou.com/';
let {getAllList,getDetail}=parse
const start=async (baseUrl)=>{
  let mainHtml=await requestUrl.get({url:baseUrl});
  await getAllList(mainHtml);
  console.log('爬取完毕')
  return
}

start(baseUrl)