'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let BannerSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  banner_name : {
    type : String
  },
  banner_name_img : {
    type : String
  },
  banner_name_link : {
    type : String
  },
  banner_proID : {
    type : Schema.Types.ObjectId,
    ref : 'Product',
  },
  banner_text : {
    type : String
  },
  banner_heading : {
    type : String
  }

},{
  timestamps : true
});

module.exports = mongoose.model('Banner', BannerSchema)
