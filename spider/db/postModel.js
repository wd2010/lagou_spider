import mongoose from './index.js';
const Schema=mongoose.Schema;

const PostSchema=new Schema({
  imgUrl: {type: String},
  title: {type: String},
  articleUrl: {type: String},
  origin:{ type: String},
  publishTime: {type:String},
  id: {type: String},
  type: {type:String},
  articleDetail: {type: String},
}, { collection: 'Post' })

const SpiderSchema=new Schema({
  url: {type: String},
}, { collection: 'Spider' })

export const Post=mongoose.model('Post',PostSchema)
export const Spider=mongoose.model('Spider',SpiderSchema)
