/**
 * test/api.test.js
 * REST API endpoint tests using Mocha + Chai
 * Tests the /api/books routes (GET all, GET by id, GET total price)
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Books REST API Endpoints', function () {

  // ── GET /api/books ──────────────────────────────────────
  describe('GET /api/books', function () {

    it('should return status 200 and an array of books', function (done) {
      chai.request(app)
        .get('/api/books')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status', 200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data).to.have.length.greaterThan(0);
          done();
        });
    });

    it('each book should have id, title, author, price and year fields', function (done) {
      chai.request(app)
        .get('/api/books')
        .end(function (err, res) {
          const book = res.body.data[0];
          expect(book).to.have.property('id');
          expect(book).to.have.property('title');
          expect(book).to.have.property('author');
          expect(book).to.have.property('price');
          expect(book).to.have.property('year');
          done();
        });
    });

  });

  // ── GET /api/books/:id ──────────────────────────────────
  describe('GET /api/books/:id', function () {

    it('should return a single book for a valid id', function (done) {
      chai.request(app)
        .get('/api/books/1')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('id', 1);
          expect(res.body.data).to.have.property('title');
          done();
        });
    });

    it('should return 404 for a book id that does not exist', function (done) {
      chai.request(app)
        .get('/api/books/9999')
        .end(function (err, res) {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status', 404);
          expect(res.body.data).to.be.null;
          done();
        });
    });

  });

  // ── GET /api/books/price/total ──────────────────────────
  describe('GET /api/books/price/total', function () {

    it('should return total price with no discount (status 200)', function (done) {
      chai.request(app)
        .get('/api/books/price/total')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('total');
          expect(res.body.data.total).to.be.a('number');
          expect(res.body.data.total).to.be.greaterThan(0);
          done();
        });
    });

    it('should return a lower total when a valid discount is applied', function (done) {
      let baseTotal;
      chai.request(app)
        .get('/api/books/price/total')
        .end(function (err, res) {
          baseTotal = res.body.data.total;
          chai.request(app)
            .get('/api/books/price/total?discount=10')
            .end(function (err2, res2) {
              expect(res2).to.have.status(200);
              expect(res2.body.data.total).to.be.lessThan(baseTotal);
              done();
            });
        });
    });

    it('should return 400 for an invalid discount value above 100', function (done) {
      chai.request(app)
        .get('/api/books/price/total?discount=150')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return 400 for a negative discount value', function (done) {
      chai.request(app)
        .get('/api/books/price/total?discount=-5')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
    });

  });

});
