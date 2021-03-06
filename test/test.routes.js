/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
// These linting exceptions allow the tests to better match the syntax of the documentation.

const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const index = require('../src/index');

const expect = chai.expect;
const describe = mocha.describe;
const it = mocha.it;
chai.use(chaiHttp);

describe('Route Tests:', function () {
  describe('Unsupported Routes Tests:', function () {
    describe("'/unusedRoute/' test", function () {
      it('should respond with a 404', (done) => {
        chai
          .request(`localhost:${index.PORT}`)
          .get('/unusedRoute/')
          .send()
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
    describe("'/edit/' test", function () {
      it('should respond with a 404', (done) => {
        chai
          .request(`localhost:${index.PORT}`)
          .get('/edit/')
          .send()
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
    describe("'/somethingElse/' test", function () {
      it('should respond with a 404', (done) => {
        chai
          .request(`localhost:${index.PORT}`)
          .get('/somethingElse/')
          .send()
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
  });
  describe("'/' test", function () {
    it('Should confirm connection, display the API name, version, and documentation URL.', (done) => {
      chai
        .request(`localhost:${index.PORT}`)
        .get('/')
        .send()
        .end((err, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.deep.equal('TRUE');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.deep.equal(
            `You have reached ${
              index.NAME
            }v${
              index.VERSION
            }. Please see the API Documentation for more information: ${
              index.DOCUMENTATION}`,
          );
          done();
        });
    });
  });
  describe("'/add/' Tests:", function () {
    describe('Trying to add an alias correctly', function () {
      it('should either be added or say that the alias is already taken', (done) => {
        chai
          .request(`localhost:${index.PORT}`)
          .post('/add/?alias=newAlias&realEmail=test@gmail.com')
          .send()
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body).to.have.property('success');
            expect(res.body.success).to.satisfy(function (success) {
              if (success === 'TRUE' || success === 'FALSE') {
                return true;
              }
              return false;
            });
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.satisfy(function (message) {
              if (
                message
                  === 'Alias has been created. Please wait 60 seconds before sending emails to the alias. Doing so ensures that the all systems have been updated and emails are not lost.'
                || message === 'Error: Duplicate alias request refused.'
              ) {
                return true;
              }
              return false;
            });
            done();
          });
      });
    });
  });
  describe("'/delete/' Tests:", function () {
    describe('Trying to delete an alias correctly', function () {
      it('should either be deleted or say that the alias does not yet exist', (done) => {
        chai
          .request(`localhost:${index.PORT}`)
          .delete('/delete/?alias=newAlias&realEmail=test@gmail.com')
          .send()
          .end((err, res) => {
            expect(res.status).to.deep.equal(200);
            expect(res.body).to.have.property('success');
            expect(res.body.success).to.satisfy(function (success) {
              if (success === 'TRUE' || success === 'FALSE') {
                return true;
              }
              return false;
            });
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.satisfy(function (message) {
              if (
                message === 'Alias has been deleted.'
                || message
                  === 'Error: Alias has not yet been registered and thus may not be deleted.'
              ) {
                return true;
              }
              return false;
            });
            done();
          });
      });
    });
    describe('Trying to delete an alias not that the provided email does not own', function () {
      it('should be refused with an explanation as to why', (done) => {
        chai
          .request(`localhost:${index.PORT}`)
          .delete('/delete/?alias=contactus&realEmail=test@gmail.com')
          .send()
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('success', 'FALSE');
            expect(res.body).to.have.property(
              'message',
              'Error: Deletion denied. The provided alias is not owned by the provided email.',
            );
            done();
          });
      });
    });
  });
});
