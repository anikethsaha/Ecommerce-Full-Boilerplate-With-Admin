'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let UserSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  name: {
    type: String,
    required: 'Please provide the username'
  },
  password: {
    type: String,

  },
  email: {
    type: String,

  },
  mobile: {
    type: Number,
  },
  address : {
      type : [String]
  },
  _oauthid : {
    type : String,
    required :  true
  },
  profile_picture : {
    type : String
  },
  coins : {
    type:Number,
    default : 0
  },
  favList : [{
    type : Schema.Types.ObjectId,
    ref : 'Product',
    default : []
  }]
},{
  timestamps : true
});

module.exports = mongoose.model('User', UserSchema)
