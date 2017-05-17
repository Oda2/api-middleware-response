const express = require('express')
const request = require('supertest')
const apireturn = require('..')

describe('app', () => {
  const app = express()

  app.use(apireturn.middleware())
  
  it('teste1', (done) => {  
    app.get('/', (req, res, next) => {
      return res.data.setObject({"id": "10"}, 200);
    })

    request(app)
      .get('/')
      .expect(200, done)
  })
})