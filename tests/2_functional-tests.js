const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite('Routing Test', function(){
        suite('GET /api/convert => conversion object', function(){
            test('Convert valid input (10L)', function(){
                chai
                    .request(server)
                    .get('/api/convert')
                    .query({input: "10L"})
                    .end(function(err, res){
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, 10);
                        assert.equal(res.body.initUnit, 'L');
                        assert.approximately(res.body.returnNum, 2.64172, 0.1);
                        assert.equal(res.body.returnUnit, "gal");
                    })
            });

            test('Convert invalid input (32g)', function(){
                chai
                    .request(server)
                    .get('/api/convert')
                    .query({input: '32g'})
                    .end(function(err, res){
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initUnit, undefined);
                    })
            });

            test('Convert invalid number (3/7.2/4kg)', function(){
                chai
                    .request(server)
                    .get('/api/convert')
                    .query({input: "3/7.2/4kg"})
                    .end(function(err, res){
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, undefined);
                    })
            });

            test('Convert invalid number AND unit (3/7.2/4kilomegagram)', function(){
                chai
                    .request(server)
                    .get('/api/convert')
                    .query({input: "3/7.2/4kilomegagram"})
                    .end(function(err, res){
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initNum, undefined);
                        assert.equal(res.body.initUnit, undefined);
                    })
            });

            test('Convert with no number (kg)', function(){
                chai
                    .request(server)
                    .get('/api/convert')
                    .query({input: "kg"})
                    .end(function(err, res){
                        assert.equal(res.status, 200);
                        assert.equal(res.body.initUnit, "kg");
                        assert.approximately(res.body.returnNum, 2.20462, 0.1);
                        assert.equal(res.body.returnUnit, "lbs");
                    })
            });
        });
    });
});
