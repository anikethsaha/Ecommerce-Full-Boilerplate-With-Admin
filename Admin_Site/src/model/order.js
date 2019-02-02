'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let orderSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  _vendorID : {
    type: Schema.Types.ObjectId,
    ref : 'Seller'
  },
  _vendorIDArray : {
    type : [String]
  },
  _userID: {
    type: Schema.Types.ObjectId,
    ref : 'User'
  },
  _productID: {
    type: Schema.Types.ObjectId,
    ref :'Product'
  },
  _cartID : {
    type :Schema.Types.ObjectId,
    ref : 'Cart'
  },
  _transactionID : {
    type :String
  },
  status: {
    type: String,
    required : true
  },
  cost: {
    type: Number,
    
  },
  mobileNo : {
    type:Number,
    
  },
  delivery_location : {
    type : [String],
    
  }
},
{timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema)
