import cheerio from 'cheerio'
import {get,post} from './requestUrl.js';
import {md5Hash,sleep} from "../util";
import {insert, findOne,find} from './db/DB.js'
let baseUrl='https://www.lagou.com/';
let cityUrl=`${baseUrl}jobs/allCity.html`;
let jobsUrl=`${baseUrl}jobs/positionAjax.json`

export const getTechnology=(pre)=>{
  let $=cheerio.load(pre);
  let categrayList=[]
  let menuBoxs=$('#sidebar>.mainNavs').find('.menu_box')
  for(let i=0;i<menuBoxs.length;i++){
    let mainTitle=$(menuBoxs[i]).find('h2').text().trim()
    let subList=$(menuBoxs[i]).find('.menu_sub.dn').find('dl')
    subList.each((idx,ele)=>{
      let subTitle=$(ele).find('dt>span').text().trim();
      let technologyList=$(ele).find('dd').find('a')
      technologyList.each((id,element)=>{
        let technologyName=$(element).text()
        let technologyUrl=$(element).attr('href')
        categrayList.push({mainTitle, subTitle, technologyName, technologyUrl})
      })
    })
  }
  return categrayList
}

export const getAllCity=async()=>{
  let pre=await get({url:cityUrl});
  let $=cheerio.load(pre);
  let cityList=[]
  let trs=$('.word_list').find('tr');
  trs.each((index,ele)=>{
    let lis=$(ele).find('.city_list').find('li');
    lis.each((index,element)=>{
      let city=$(element).find('a').text().trim()
      cityList.push(city)
    })
  })
  return cityList
}

export const getAllList=async (pre)=>{
  let categrayList=getTechnology(pre);
  let cityList=await getAllCity();
  for(let i=0;i<categrayList.length;i++){
    let {technologyName:kd}=categrayList[i]
    for(let j=0;j<cityList.length;j++){

      let city=cityList[j];
      let querystr=`city=${city}&needAddtionalResult=false&isSchoolJob=0`
      for(let pn=0;pn<=47;pn++){
        let body={first:true, pn,kd}
        let url=`${jobsUrl}?${querystr}`;
        console.log('city=',city,' page=',pn,' technology=',kd)
        let res=await post({url,body})
        if(pn>37){
          console.log(res.content)
        }

        await sleep()
      }
    }
  }
}

export const getList=(pre,type,more)=>{
  if(pre.statusCode==404)return
  let $=cheerio.load(pre);
  let $li=more?$('li'):$('.news-list').find('li')
  $li.each(async (idx,element)=>{
    let imgUrl=$(element).find('img').attr('src')
    let title=$(element).find('h3>a').text()
    let articleUrl=$(element).find('h3>a').attr('href')
    let origin=$(element).find('.s-p>a').text()
    let publishTime=$(element).find('.s-p').attr('t')
    let id=md5Hash(articleUrl+publishTime)
    let articleDetail=await getArticle(articleUrl)
    let obj={imgUrl,title,articleUrl,origin,publishTime,id,type,articleDetail}
    console.log('正在获取：',type,title)
    await insert(obj,'Post')
  })
}

export const getArticle=async (url)=>{
  let pre = await get({url})
  let $=cheerio.load(pre);
  let $p=$('.rich_media_content').children('p');
  let str=''
  $p.each((index,element)=>{
    str+=$(element).text()
  })
  return str
}
