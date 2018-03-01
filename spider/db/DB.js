import {Post, Spider} from './postModel.js';

const getModel=(coll)=>coll==='Post'? Post: Spider;

export const insert=async(obj,coll='Post')=>{
  let Model=getModel(coll);
  let entity=new Model(obj)
  return await new Promise(resolve=> {
    entity.save((err, res) => {
      if (err) throw err
      resolve(res)
    })
  })
}

export const find=async(wherestr={},option={},coll='Post')=>{
  let Model=getModel(coll);
  return await new Promise(resolve=>{
    Model.find(wherestr,option,(err,res)=>{
      if(err)throw err
      resolve(res)
    })
  })
}

export const findOne=async (wherestr={},coll='Post')=>{
  let Model=getModel(coll);
  return await new Promise(resolve=>{
    Model.findOne(wherestr,(err,res)=>{
      if(err)throw err
      console.log(res)
      resolve(res)
    })
  })
}