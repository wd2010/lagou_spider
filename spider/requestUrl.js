import request from 'request';
import superagent from 'superagent'
import rp from 'request-promise';
const userAgent='Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36'
const cookie='Cookie: showExpriedIndex=1; showExpriedCompanyHome=1; showExpriedMyPublish=1; JSESSIONID=ABAAABAACEBACDG21B17FDB01FEFE1CB848B9E9F0D2D5BF; hasDeliver=0; gate_login_token=""; user_trace_token=20180301145907-cb8b9b84-646c-4bb1-921d-3ebb4c9f06e0; X_HTTP_TOKEN=b50a0fcaf42e5f48313e69430593c2ca; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1519887360; _ga=GA1.2.929401447.1519887360; _gid=GA1.2.775393189.1519887360; LGSID=20180301145907-091f2b80-1d1e-11e8-97a3-525400f775ce; PRE_UTM=; PRE_HOST=; PRE_SITE=; PRE_LAND=https%3A%2F%2Fpassport.lagou.com%2Flogin%2Flogin.html; LGUID=20180301145907-091f2e32-1d1e-11e8-97a3-525400f775ce; _putrc=906142E42E115BEB; login=true; unick=wd2010; gate_login_token=1b812a5b279906e50c16cc62313976559bbc25739faa857d; index_location_city=%E5%B9%BF%E5%B7%9E; SEARCH_ID=cdd42c8e7a6745dabbb6c904a14d432c; TG-TRACK-CODE=index_code; LGRID=20180301151133-c5eaa7ac-1d1f-11e8-b106-5254005c3644; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1519888106\n'

export const get=async ({url})=>{

  let options={uri: url, headers: {
    'User-Agent': userAgent/*'Request-Promise'*/,
    // 'Cookie': cookie,
  }};
  let err;
  let res=await rp(options).catch(e=>err=e)
  return err?err:res
}

export const post=async({url,body})=>{
  let options={method: 'POST',uri: url, body , headers: {'User-Agent': 'Request-Promise','Cookie': cookie,},};
  let res=await rp(options)
  return res
}

/*export const get=async ({url})=>{
  return superagent
    .get(url)
    .set({'User-Agent': userAgent,})
}

export const post=async ({url,body})=>{
  return superagent
    .get(url)
    .set({'User-Agent': userAgent,})
    .send(body)
}*/
