'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let UserSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  _userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref : 'User'
  },
  _productIDArray : [{
    type: Schema.Types.ObjectId,
    ref :'Product'
  }],
  quantityArray : {
      type :[Number], 
      required:true    
  },
  cost : {
      type :Number,
      required : true
  },
  status : {
      type : String,
      required : true
  },
  numberOfItem : {
    type : Number,
    required :true,
    default : 0
  }
  
},{
  timestamps : true
});

module.exports = mongoose.model('Cart', UserSchema)
