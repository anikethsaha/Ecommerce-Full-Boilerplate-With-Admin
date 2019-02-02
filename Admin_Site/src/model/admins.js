'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let AdminSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  username: {
    type: String,
    required: 'Please provide the username'
  },
  password: {
    type: String,
    required : true
  },
  email: {
    type: String,
    required : true
  },
  mobile: {
    type: Number,
  },

  first_name : {
      type:String,
      required : true
  },
  last_name : {
    type:String,
    required : true
    },
    role_type: {
      type : String,
    },
    emp_id : {
        type : Number,
        default : 11111
    }
},{
  timestamps : true
});

module.exports = mongoose.model('Admin',AdminSchema)
