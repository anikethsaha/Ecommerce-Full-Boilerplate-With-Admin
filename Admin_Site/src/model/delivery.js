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
    type: [Schema.Types.ObjectId],
    required: true,
    ref : 'Seller'
  },
  _userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref : 'User'
  },
  _productID: {
    type: Schema.Types.ObjectId,
    ref :'Product'
  },
  _cartID : {
    type :Schema.Types.ObjectId
  },
  delivery_status : {
      type : String,
      require : true
  },
  _orderID : {
    type: Schema.Types.ObjectId,
    required: true,
    ref : 'Order'
  },
  delivery_location : {
      type : [String],
      required : true
  },
  delivery_contact_details : {
      type: Number
  },
  user_contact_details : {
      type :Number
  },
  delivery_date : {
      type :String
  }
},
{timestamps: true}
);

module.exports = mongoose.model('Delivery', orderSchema)
