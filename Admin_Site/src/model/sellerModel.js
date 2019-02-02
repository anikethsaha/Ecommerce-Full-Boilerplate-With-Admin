'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let SellerSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  name: {
    type: String,
    required: 'Please provide the username'
  },
  company_name: {
    type: String,
    required: 'Please provide the comapanyname'
  },
  password: {
    type: String,
    required : "Please provide the userpassworrd"

  },
  email: {
    type: String,
    required : "Please provide the email"
  },
  mobile: {
    type: Number,
    required : "Please provide the mobile number"
  },
  isApproved : {
    type : Boolean,
    required : true
  }

});

module.exports = mongoose.model('Seller', SellerSchema)
