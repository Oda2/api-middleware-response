const express = require('express')
const request = require('supertest')
const apireturn = require('..')

describe('app', () => {
  const app = express()

  app.use(apireturn.middleware())
  
  it('object default', (done) => {  
    app.get('/object', (req, res, next) => {
      return res.data.setObject({"id": "10"}, 200);
    })

    request(app)
      .get('/object')
      .expect(200)
      .expect({"id": "10"}, done)
  })

  it('object array', (done) => {
    app.get('/array', (req, res, next) => {
      return res.data.setArrayObject([{"id": "10"}, {"id": "20"}], 200);
    })

    request(app)
      .get('/array')
      .expect(200)
      .expect(/paging/, done)
  });
})