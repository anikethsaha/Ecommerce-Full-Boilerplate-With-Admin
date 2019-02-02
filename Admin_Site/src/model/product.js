'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let productSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  name: {
    type: String,
    required: true
  },
  metaData : {
    type : Schema.Types.Mixed,
    required : true
  },
  category:{
    type:String,
    required:true
  },
  subCategory : {
    type :String,
    require:false
},
  price: {
    type: Number
  },
  old_price : {
    type: Number,
    default : 0
  },
  description: {
    type: String,
    required : true
  },
  _vendorID: {
    type: Schema.Types.ObjectId,
    ref : 'Seller',
    required : true
  },
  images : {
    type : [String]
  },
  rating : {
    type : Number,
    Default : 0
  },
  QualityType : {
    type : String,
    default : "New"
  },
  termsAndConditions : {
    type : String
  },
  highlights : {
    type : [String],
    default : null
  },
  isPopular : {
    type: Boolean,
    default : false
  },
  favCount : {
    type : Number,
    default : 0
  },

  isOutOfStock : {
    type : Boolean,
    default : false
  }

});

module.exports = mongoose.model('Product', productSchema)
