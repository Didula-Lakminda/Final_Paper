const app = require('../server');
const mongoose = require('mongoose');
const supertest = require('supertest');

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/Final_Paper",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});
test("Get all Vehicles api testing ", () => {
  return supertest(app)
    .get("/load/")
    .then((response) => {
      expect(response.statusCode).toBe(200);
    });
});
afterEach((done) => {
  mongoose.disconnect();
  return done();
});
