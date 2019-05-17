const request = require('supertest')
const app = require('./test.server')

let server;

beforeAll(async () => {
    server = await app.listen(8000, () => {
        console.log('>  Test Server is running on PORT ', 8000);
    })
})




describe('GET /', () => {
    it("Should return 200 OK", (done) => {
        request(app).get('/').expect(200);
        done();
    })
})



describe('GET /page', () => {
    it("Should return 200 OK", (done) => {
        request(app).get('/page').expect(200);
        done();
    })
})



describe('GET /donate', () => {
    it("Should return 200 OK", (done) => {
        request(app).get('/donate').expect(200);
        done();
    })
})



describe('GET /community', () => {
    it("Should return 200 OK", (done) => {
        request(app).get('/community').expect(200);
        done();
    })
})

describe('GET /contact', () => {
    it("Should return 200 OK", (done) => {
        request(app).get('/contact').expect(200);
        done();
    })
})

afterAll((done) => {
    server.close()
    done()
})