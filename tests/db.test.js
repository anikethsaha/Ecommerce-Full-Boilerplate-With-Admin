/* eslint-disable no-undef */
const request = require('supertest')
const mongoose = require('mongoose');

const {
  MONGODB_URL
} = require('../configs/config.js')




beforeAll(async () => {
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true
  });
  console.log('mongoose.connection.readyState', mongoose.connection.readyState)
})





describe('MongoDB Connection Checking',() => {
  it("should be 1 or 2",(done) => {
    expect(mongoose.connection.readyState).toBe(1)
   done()
  })
})



afterAll((done) => {

  done()
})