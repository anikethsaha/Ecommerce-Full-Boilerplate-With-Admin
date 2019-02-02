'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let TransactionSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
 _customerID : {
     type : Schema.Types.ObjectId,
     ref : 'User'
 },
 _stripeTransactionID : {
     type : String,
     require : true
 },
 amount : {
     type :Number,
     required : true
 },
 currency : {
     type : String,
     required : true
 },
 transactionCreatedAt:{
     type : Number,
     required : true
 },
 description : {
     type :String,
     required:true
 },
 _balance_transactionID: {
     type : String,
     required :true
 },
 object : {
     type : String,
     required:true,
     default : "charge"
 },
 status : {
     type:String,
     required:true
 },
 _sourcesCardID:{
     type:String,
     required:true
 },
 paid : {
     type:Boolean,
     required:true
 },
 refundURL : {
     type : String,
     required:true
 },
 risk_level : {
     type:String,
     required:true
 },
 seller_message : {
    type:String,
    required:true
}
},{
  timestamps : true
});

module.exports = mongoose.model('Payment_transaction', TransactionSchema)
