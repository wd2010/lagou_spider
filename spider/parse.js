import cheerio from 'cheerio'
import {get,post} from './requestUrl.js';
import {md5Hash} from "../util";
import {insert, findOne,find} from './db/DB.js'
let baseUrl='https://www.lagou.com/';

export const getTechnology=(pre)=>{
  let $=cheerio.load(pre);
  let categrayList=$('#sidebar>.mainNavs').find('.menu_box')
  for(let i=0;i<categrayList.length;i++){
    let mainTitle=$(categrayList[i]).find('h2').text().trim()
    let subList=$(categrayList[i]).find('.menu_sub.dn').find('dl')
    subList.each((idx,ele)=>{
      let subTitle=$(ele).find('dt>span').text().trim();
      let technoloageList=$(ele).find('dd').find('a')
      technoloageList.each((id,element)=>{
        let technoloageName=$(element).text()
        let technoloageUrl=$(element).attr('href')
        console.log(mainTitle, subTitle, technoloageName, technoloageUrl)
      })
    })
  }
}

export const getAllCity=async()=>{
  let pre=await get({url:baseUrl+'jobs/allCity.html'});
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
  console.log(cityList)
}

export const getAllList=async (pre)=>{
  let categrayList=getTechnology(pre);
  let cityList=getAllCity();
  console.log(categrayList)
  /*let len=categrayList.length;
  for (let i=0;i<len;i++){
    let categray=categrayList[i]['url'];
    let type=categrayList[i]['name'];
    let url=`${baseUrl}${categray}/${categray}.html`;
    let res = await findOne({url},'Spider')
    if(res)continue
    await insert({url},'Spider')
    let context=await get({url})
    getList(context,type)
  }
  for (let j=0;j<len;j++){
    let categray=categrayList[j]['url'];
    let type=categrayList[j]['name'];
    let k=1
    do{
      let url=`${baseUrl}${categray}/${k}.html`;
      let res = await findOne({url},'Spider')
      if(res){
        var context=await get({url});
        continue
      }
      await insert({url},'Spider')
      var context=await get({url})
      getList(context,type,'more')

    }
    while(k++ <20 || context.statusCode!=404)
  }*/
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
