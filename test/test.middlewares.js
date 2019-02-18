var chai = require('chai');
var mocha = require('mocha');
var app = require('../index.js').app;
var expect = chai.expect;
var chaiHttp = require('chai-http');
var index = require('../index');

chai.use(chaiHttp);

describe('Middleware Tests:', function() {
    describe ('checkParamsMiddleware Tests', function(){
        describe('\'/add/\' Tests:', function () {
            describe('Trying to add an alias without either param test', function () {
                it('should be disallowed and the user should be told to provide both params', (done) => {
                    chai.request('localhost:' + index.PORT)
                        .get('/add/')
                        .send()
                        .end((err, res) => {
                            expect(res.status).to.equal(422);
                            expect(res.body).to.have.property('success', 'FALSE');
                            expect(res.body).to.have.property('message', 'Error: Missing required param. Please ensure that the following params are provided in the query: alias, realEmail.');
                            done();
                        });
                });

            });

            describe('Trying to add an alias with an alias param, without a realEmail param test', function () {
                it('should be disallowed and the user should be told to provide both params', (done) => {
                    chai.request('localhost:' + index.PORT)
                        .get('/add/?alias=uniqueAlias')
                        .send()
                        .end((err, res) => {
                            expect(res.status).to.equal(422);
                            expect(res.body).to.have.property('success', 'FALSE');
                            expect(res.body).to.have.property('message', 'Error: Missing required param. Please ensure that the following params are provided in the query: alias, realEmail.');
                            done();
                        });
                });
            });

            describe('Trying to add an alias with a realEmail param, without an alias param test', function () {
                it('should be disallowed and the user should be told to provide both params', (done) => {
                    chai.request('localhost:' + index.PORT)
                        .get('/add/?realEmail=realEmail@gmail.com')
                        .send()
                        .end((err, res) => {
                            expect(res.status).to.deep.equal(422);
                            expect(res.body).to.have.property('success', 'FALSE');
                            expect(res.body).to.have.property('message', 'Error: Missing required param. Please ensure that the following params are provided in the query: alias, realEmail.');
                            done();
                        });
                });
            });
        });
        describe('\'/delete/\' Tests', function (){
            describe('Trying to delete an alias without either param test' ,function(){
                it('should be disallowed and the user should be told to provide both params',(done) => {
                    chai.request('localhost:' + index.PORT)
                        .get('/delete/')
                        .send()
                        .end((err, res) => {
                            expect(res.status).to.equal(422);
                            expect(res.body).to.have.property('success', 'FALSE');
                            expect(res.body).to.have.property('message', 'Error: Missing required param. Please ensure that the following params are provided in the query: alias, realEmail.');
                            done();
                        });
                });

            });

            describe('Trying to delete an alias with an alias param, without a realEmail param test' ,function(){
                it('should be disallowed and the user should be told to provide both params',(done) => {
                    chai.request('localhost:'+index.PORT)
                        .get('/delete/?alias=uniqueAlias')
                        .send()
                        .end((err, res) => {
                            expect(res.status).to.equal(422);
                            expect(res.body).to.have.property('success', 'FALSE');
                            expect(res.body).to.have.property('message', 'Error: Missing required param. Please ensure that the following params are provided in the query: alias, realEmail.');
                            done();
                        });
                    });
            });

            describe('Trying to delete an alias with a realEmail param, without an alias param test' ,function(){
                it('should be disallowed and the user should be told to provide both params',(done) => {
                    chai.request('localhost:'+index.PORT)
                        .get('/delete/?realEmail=test@gmail.com')
                        .send()
                        .end((err, res) => {
                            expect(res.status).to.deep.equal(422);
                            expect(res.body).to.have.property('success', 'FALSE');
                            expect(res.body).to.have.property('message', 'Error: Missing required param. Please ensure that the following params are provided in the query: alias, realEmail.');
                            done();
                        });
                });
            });

        });
    });
    describe ('validateParamsMiddleware Tests', function(){
        describe('Trying to submit a request with an invalid alias' ,function(){
            it('should be rejected with a message as to why',(done) => {
                chai.request('localhost:'+index.PORT)
                    .get('/add/?alias=@alias&realEmail=test@gmail.com')
                    .send()
                    .end((err, res) => {
                        expect(res.status).to.deep.equal(422);
                        expect(res.body).to.have.property('success', 'FALSE');
                        expect(res.body).to.have.property('message', 'Error: The supplied alias parameter is invalid. Please be sure that it does not contain an \'@\' symbol.');
                        done();
                    });
            });
        });
        describe('Trying to submit a request with an invalid email' ,function(){
            it('should be rejected with a message as to why',(done) => {
                chai.request('localhost:'+index.PORT)
                    .get('/add/?alias=alias111&realEmail=test')
                    .send()
                    .end((err, res) => {
                        expect(res.status).to.deep.equal(422);
                        expect(res.body).to.have.property('success', 'FALSE');
                        expect(res.body).to.have.property('message', 'Error: The supplied realEmail parameter is invalid.');
                        done();
                    });
            });
        });
    });
});
