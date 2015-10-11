var Code = require('code');
var expect = Code.expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var sinon = require('sinon');
var describe = lab.describe;
var it = lab.it;
var controller = require('../../../server/controllers/account');

var stubbedRequest = {
  auth: {
    session: {}
  },
  session: {}
};
var stubbedReply = {};
var serviceStub = require('../../../server/library/clients/account');

describe('successful login', function() {
  it ('redirects user to headquarters home if user has multiple locations', function(done) {
      var userWithLocations = {
        id: 7,
        locations: [{id: 1}, {id: 2}]
      };
      sinon.stub(serviceStub, "validate", function(payload, callback) {callback(userWithLocations)});
      stubbedRequest.auth.session.set = sinon.spy();
      stubbedRequest.session.set = sinon.spy();

      stubbedRequest.payload = {username: 'testUserName', password: 'testPassword'};

      stubbedReply.redirect = function(route) {
        expect(route).to.equal('/headquarters');
        expect(stubbedRequest.auth.session.set.calledWith(stubbedRequest.payload));
        expect(stubbedRequest.session.set.calledWith('7'));

        serviceStub.validate.restore();
        done();
      };
      controller.login.handler(stubbedRequest, stubbedReply);

  }) ;

  it ('redirects user to only locations headquarters if user has one location', function(done) {
      var userWithLocations = {
        id: 7,
        locations: [{id: 1}]
      };
      sinon.stub(serviceStub, "validate", function(payload, callback) {callback(userWithLocations)});
      stubbedRequest.auth.session.set = sinon.spy();
      stubbedRequest.session.set = sinon.spy();

      stubbedRequest.payload = {username: 'testUserName', password: 'testPassword'};

      stubbedReply.redirect = function(route) {
        expect(route).to.equal('/headquarters/location/1');
        expect(stubbedRequest.auth.session.set.calledWith(stubbedRequest.payload));
        expect(stubbedRequest.session.set.calledWith('7'));

        serviceStub.validate.restore();
        done();
      };
      controller.login.handler(stubbedRequest, stubbedReply);

  }) ;

  it ('redirects user to home page if they do not have any locations', function(done) {
    var userWithLocations = {
      id: 7,
      locations: []
    };
    sinon.stub(serviceStub, "validate", function(payload, callback) {callback(userWithLocations)});
    stubbedRequest.auth.session.set = sinon.spy();
    stubbedRequest.session.set = sinon.spy();

    stubbedRequest.payload = {username: 'testUserName', password: 'testPassword'};

    stubbedReply.redirect = function(route) {
      expect(route).to.equal('/');
      expect(stubbedRequest.auth.session.set.calledWith(stubbedRequest.payload));
      expect(stubbedRequest.session.set.calledWith('7'));
      done();
    };
    controller.login.handler(stubbedRequest, stubbedReply);
  }) ;
});
