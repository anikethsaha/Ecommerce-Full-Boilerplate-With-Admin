/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../server')


// console.log('app', app)

describe('GET /', () => {
  it("should return status 200",() => {
    return request(app).get('/').expect(200)
  },500)
})



afterAll((done) => {
  done()
})