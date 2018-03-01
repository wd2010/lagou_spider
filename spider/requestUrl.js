import request from 'request';
import superagent from 'superagent'

//const userAgent='Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36'
//const cookie='Cookie: showExpriedIndex=1; showExpriedCompanyHome=1; showExpriedMyPublish=1; JSESSIONID=ABAAABAACEBACDG21B17FDB01FEFE1CB848B9E9F0D2D5BF; hasDeliver=0; gate_login_token=""; user_trace_token=20180301145907-cb8b9b84-646c-4bb1-921d-3ebb4c9f06e0; X_HTTP_TOKEN=b50a0fcaf42e5f48313e69430593c2ca; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1519887360; _ga=GA1.2.929401447.1519887360; _gid=GA1.2.775393189.1519887360; LGSID=20180301145907-091f2b80-1d1e-11e8-97a3-525400f775ce; PRE_UTM=; PRE_HOST=; PRE_SITE=; PRE_LAND=https%3A%2F%2Fpassport.lagou.com%2Flogin%2Flogin.html; LGUID=20180301145907-091f2e32-1d1e-11e8-97a3-525400f775ce; _putrc=906142E42E115BEB; login=true; unick=wd2010; gate_login_token=1b812a5b279906e50c16cc62313976559bbc25739faa857d; index_location_city=%E5%B9%BF%E5%B7%9E; SEARCH_ID=cdd42c8e7a6745dabbb6c904a14d432c; TG-TRACK-CODE=index_code; LGRID=20180301151133-c5eaa7ac-1d1f-11e8-b106-5254005c3644; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1519888106\n'
let headers= {
  //'User-Agent': 'Request-Promise',
    "Accept":"application/json, text/javascript, */*; charset=UTF-8; q=0.01",
    //"Accept-Encoding":"gzip, deflate, br",
    "Accept-Language":"zh-CN,zh;q=0.9,en;q=0.8",
    "Cache-Control":"no-cache",
    "Connection":"keep-alive",
    //"Content-Length":"23",
    //"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie":"_ga=GA1.2.400071214.1519476997; user_trace_token=20180224205844-72443477-1962-11e8-b08f-5254005c3644; LGUID=20180224205844-72444151-1962-11e8-b08f-5254005c3644; _gid=GA1.2.1016596668.1519913090; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1519476997,1519913091; LGSID=20180301220704-d1cfbc35-1d59-11e8-985f-525400f775ce; PRE_UTM=m_cf_cpt_baidu_pc; PRE_HOST=www.baidu.com; PRE_SITE=https%3A%2F%2Fwww.baidu.com%2Fs%3Fie%3DUTF-8%26wd%3Dlagou; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2Flp%2Fhtml%2Fcommon.html%3Futm_source%3Dm_cf_cpt_baidu_pc; X_HTTP_TOKEN=621da73d7200ddbc69e03fcef992a523; _putrc=906142E42E115BEB; JSESSIONID=ABAAABAAAIAACBI69170378A3F933312859F26A989389E9; login=true; unick=wd2010; showExpriedIndex=1; showExpriedCompanyHome=1; showExpriedMyPublish=1; hasDeliver=0; gate_login_token=d18f904ef64fab9a4e459ecdcf59c048498efb9275deb3d8; index_location_city=%E5%B9%BF%E5%B7%9E; TG-TRACK-CODE=index_code; _gat=1; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1519913238; LGRID=20180301220939-2e1a8cdc-1d5a-11e8-9860-525400f775ce; SEARCH_ID=1b7969e2596940fd8570d5257b4d4a74",
    "Host":"www.lagou.com",
    "Pragma":"no-cache",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36",
    "X-Anit-Forge-Code":"0",
    "X-Anit-Forge-Token":"None",
    "X-Requested-With":"XMLHttpRequest",
    "Origin":"https://www.lagou.com",
    "Referer":"https://www.lagou.com/jobs/list_java?city=%E5%B9%BF%E5%B7%9E&cl=false&fromSearch=true&labelWords=&suginput=",
}


export const get=async ({url})=>{
  return new Promise(resolve=>{
    let options={
      url,
      method:'GET',
      json:true,
      headers
    };
    request(options,(error, response, body)=>{
      resolve(body)
    })
  })
}

export const post=async({url,body})=>{
  return new Promise(resolve=>{
    let options={
      url,
      method:'POST',
      json:true,
      headers,
      body: JSON.stringify(body)
    };
    request(options,(error, response, body)=>{
      resolve(body)
    })
  })
}

