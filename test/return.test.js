const express = require('express')
const request = require('supertest')
const should = require('should')
const bodyParser = require('body-parser')
const apireturn = require('..')

const _returnArray = [
  { "id": "1" }, { "id": "2" }, { "id": "3" }, { "id": "4" }, { "id": "5" }, { "id": "6" }, { "id": "7" }, { "id": "8" }, { "id": "9" }, { "id": "10" },
  { "id": "11" }, { "id": "12" }, { "id": "13" }, { "id": "14" }, { "id": "15" }, { "id": "16" }, { "id": "17" }, { "id": "18" }, { "id": "19" }, { "id": "20" },
]

describe('app', () => {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(apireturn())

  it('object default', (done) => {
    app.get('/object', (req, res, next) => {
      return res.data.setObject({ "id": "10" })
    })

    request(app)
      .get('/object')
      .expect(200)
      .expect({ "id": "10" })
      .end((err, res) => {
        if (err) {
          return done(new Error(err))          
        }

        res.header['content-type'].should.equal('application/json; charset=utf-8')
        done()
      })
  })

  it('create resource', (done) => {
    app.post('/user', (req, res, next) => {
      let newUser = {
        id: "1",
        name: req.body.name
      }
      return res.data.setObject(newUser, 201)
    })

    request(app)
      .post('/user')
      .send({ "name": "Renato" })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        res.body.id.should.equal("1")
        res.body.name.should.equal("Renato")
        done()
      })
  })

  it('object array base', (done) => {
    app.get('/array/base', (req, res, next) => {
      return res.data.setArrayObject([{ "id": "10" }, { "id": "20" }])
    })

    request(app)
      .get('/array/base')
      .expect(200)
      .expect(/paging/, done)
  })

  it('object array sequelize', (done) => {
    app.get('/array/sequelize', (req, res, next) => {
      return res.data.setArrayObject(
        {
          "count": "10",
          "rows": [
            { "id": "10" },
            { "id": "20" }
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

        res.body.data.should.not.containEql({ "count": "10" })
        done()
      })
  })

  it('object array paging', (done) => {
    app.get('/array/paging', (req, res, next) => {
      return res.data.setArrayObject(_returnArray, 200)
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

        parseInt(res.body.paging.total).should.equal(20)
        parseInt(res.body.paging.pages).should.equal(10)
        parseInt(res.body.paging.currentPage).should.equal(5)
        parseInt(res.body.paging.perPage).should.equal(2)
        done()
      })
  })

  it('object query remove limit in array paging', (done) => {
    app.get('/array/paging', (req, res, next) => {
      req.query = {}
      return res.data.setArrayObject(_returnArray, 200)
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

        parseInt(res.body.paging.total).should.equal(20)
        parseInt(res.body.paging.pages).should.equal(10)
        parseInt(res.body.paging.currentPage).should.equal(5)
        parseInt(res.body.paging.perPage).should.equal(2)
        done()
      })
  })

  it('error set array', (done) => {
    app.get('/array/error', (req, res, next) => {
      return res.data.setArrayObject({ "id": "1", "name": "Renato" })
    })

    request(app)
      .get('/array/error')
      .expect(500, done)
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

  it('400 - Invalid Request Message', (done) => {
    app.get('/invalidRequestMessage', (req, res, next) => {
      return res.data.setInvalidRequest('description is required')
    })

    request(app)
      .get('/invalidRequestMessage')
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        res.body.success.should.equal(false)
        res.body.message.should.equal('description is required')
        done()
      })
  })

  it('401 - Not Authenticated', (done) => {
    app.get('/invalidLogin', (req, res, next) => {
      return res.data.setInvalidRequest("Not Authenticated", 401)
    })

    request(app)
      .get('/invalidLogin')
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        res.body.success.should.equal(false)
        res.body.message.should.equal('Not Authenticated')
        done()
      })
  })

  it('404 - Data not Found', (done) => {
    app.get('/dataNotFound', (req, res, next) => {
      return res.data.setDataNotFound()
    })

    request(app)
      .get('/dataNotFound')
      .expect(404, done)
  })

  it('404 - Data not Found Message', (done) => {
    app.get('/dataNotFoundMessage', (req, res, next) => {
      return res.data.setDataNotFound('user not found')
    })

    request(app)
      .get('/dataNotFoundMessage')
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        res.body.success.should.equal(false)
        res.body.message.should.equal('user not found')
        done()
      })
  })

  it('500 - Internal Server Error', (done) => {
    app.get('/internalError', (req, res, next) => {
      return res.data.setInternalServerError()
    })

    request(app)
      .get('/internalError')
      .expect(500, done)
  })

  it('500 - Internal Server Error Message', (done) => {
    app.get('/internalErrorMessage', (req, res, next) => {
      return res.data.setInternalServerError('ConnectionRefusedError')
    })

    request(app)
      .get('/internalErrorMessage')
      .expect(500)
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        res.body.success.should.equal(false)
        res.body.message.should.equal('ConnectionRefusedError')
        done()
      })
  })
})

describe('app options', () => {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(apireturn({
    limit: 3,
    header: {
      contentType: 'application/json'
    }
  }))

  it('object default', (done) => {
    app.get('/object', (req, res, next) => {
      return res.data.setObject({ "id": "10" })
    })

    request(app)
      .get('/object')
      .expect(200)
      .expect({ "id": "10" })
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        res.header['content-type'].should.equal('application/json; charset=utf-8')
        done()
      })
  })

  it('object array paging limit', (done) => {
    app.get('/array/paging', (req, res, next) => {
      return res.data.setArrayObject(_returnArray, 200)
    })

    request(app)
      .get('/array/paging')
      .query({
        "limit": "5",
        "page": "5"
      })
      .expect(200)
      .expect(/paging/)
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        parseInt(res.body.paging.total).should.equal(20)
        parseInt(res.body.paging.pages).should.equal(7)
        parseInt(res.body.paging.currentPage).should.equal(5)
        parseInt(res.body.paging.perPage).should.equal(3)
        done()
      })
  })

  it('request test query', (done) => {
    app.get('/array/query', (req, res, next) => {
      return res.data.setArrayObject(_returnArray, 200)
    })

    request(app)
      .get('/array/query')
      .expect(200)
      .expect(/paging/)
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        parseInt(res.body.paging.total).should.equal(20)
        parseInt(res.body.paging.pages).should.equal(7)
        parseInt(res.body.paging.currentPage).should.equal(1)
        parseInt(res.body.paging.perPage).should.equal(3)
        done()
      })
  })

  it('request test query optional', (done) => {
    app.get('/array/query/optional', (req, res, next) => {
      return res.data.setArrayObject(_returnArray, 200)
    })

    request(app)
      .get('/array/query/optional')
      .query({
        "limit": "2",
        "page": "10"
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        parseInt(res.body.paging.total).should.equal(20)
        parseInt(res.body.paging.pages).should.equal(10)
        parseInt(res.body.paging.currentPage).should.equal(10)
        parseInt(res.body.paging.perPage).should.equal(2)

        done()
      })
  })

  it ('request query page (offset)', (done) => {
    app.get('/array/query/page', (req, res, next) => {
      parseInt(req.query.page).should.equal(0)
      return res.data.setArrayObject(_returnArray, 200)
    })

    request(app)
      .get('/array/query/page')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(new Error(err))
        }

        parseInt(res.body.paging.currentPage).should.equal(1)
        done()
      })
  })

})