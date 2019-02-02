'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema

let fileUploadSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true,
    required : true
  },
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number


},
{timestamps: true});

module.exports = mongoose.model('fileUpload', fileUploadSchema)
