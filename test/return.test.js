const express = require('express')
const request = require('supertest')
const should = require('should')
const apireturn = require('..')

describe('app', () => {
  const app = express()

  app.use(apireturn.apiresponse())
  
  it('object default', (done) => {  
    app.get('/object', (req, res, next) => {
      return res.data.setObject({"id": "10"}, 200)
    })

    request(app)
      .get('/object')
      .expect(200)
      .expect({"id": "10"}, done)
  })

  it('object array base', (done) => {
    app.get('/array/base', (req, res, next) => {
      return res.data.setArrayObject([{"id": "10"}, {"id": "20"}], 200)
    })

    request(app)
      .get('/array/base')
      .expect(200)
      .expect(/paging/, done)
  })

  it ('object array sequelize', (done) => {
    app.get('/array/sequelize', (req, res, next) => {
      return res.data.setArrayObject(
        {
          "count": "10", 
          "rows": [
            {"id": "10"}, 
            {"id": "20"}
          ]
      }, 200)
    })

    request(app)
      .get('/array/sequelize')      
      .expect(200)
      .expect(/paging/)
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        res.body.data.should.not.containEql({"count": "10"})        
        done()
      })
  })

  it ('object array paging', (done) => {
    app.get('/array/paging', (req, res, next) => {
      return res.data.setArrayObject([
        { "id": "1" }, { "id": "2" }, { "id": "3" }, { "id": "4" }, { "id": "5" }, { "id": "6" }, { "id": "7" }, { "id": "8" }, { "id": "9" }, { "id": "10" },
        { "id": "11" }, { "id": "12" }, { "id": "13" }, { "id": "14" }, { "id": "15" }, { "id": "16" }, { "id": "17" }, { "id": "18" }, { "id": "19" }, { "id": "20" },
      ], 200)
    })

    request(app)
      .get('/array/paging')
      .query({
        "limit": "2",
        "page": "5"
      })
      .expect(200)
      .expect(/paging/)
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        res.body.paging.currentPage.should.equal(5)
        res.body.paging.perPage.should.equal(2)
        done()
      })
  })

  it('202 - Accepted', (done) => {
    app.get('/accepted', (req, res, next) => {
      return res.data.setAccepted()
    })

    request(app)
      .get('/accepted')
      .expect(202, done)
  })  

  it('204 - no content', (done) => {
    app.get('/noContent', (req, res, next) => {
      return res.data.setNoContent()
    })

    request(app)
      .get('/noContent')
      .expect(204, done)
  })

  it('204 - Delete Resource', (done) => {
    app.get('/deleteResource', (req, res, next) => {
      return res.data.setDeleteResource()
    })

    request(app)
      .get('/deleteResource')
      .expect(204, done)
  })

  it('400 - Invalid Request', (done) => {
    app.get('/invalidRequest', (req, res, next) => {
      return res.data.setInvalidRequest()
    })

    request(app)
      .get('/invalidRequest')
      .expect(400, done)
  })

  it('404 - Data not Found', (done) => {
    app.get('/dataNotFound', (req, res, next) => {
      return res.data.setDataNotFound()
    })

    request(app)
      .get('/dataNotFound')
      .expect(404, done)
  })

  it('500 - Internal Server Error', (done) => {
    app.get('/internalError', (req, res, next) => {
      return res.data.setInternalServerError()
    })

    request(app)
      .get('/internalError')
      .expect(500, done)
  })
})