
'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let NewsletterSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  email : {
      type : String,
      required : true
  }

},{
  timestamps : true
});

module.exports = mongoose.model('Newsletter', NewsletterSchema )
