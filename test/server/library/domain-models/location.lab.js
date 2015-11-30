'use strict';

var Code = require('code');
var expect = Code.expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var suite = lab.suite;
var test = lab.test;
var sinon = require('sinon');

var locationDomain = require('../../../../server/library/domain-models/location');
var locationFixture = require('../../../fixtures/database-fixtures/location').getLocationFixture();
var locationClient = require('../../../../server/library/clients/location');


suite('construct', function() {
    test('creates location domain model', function (done) {
      var locationDataObject = {
        id: 1,
        xCoordinate: 5,
        yCoordinate: 9
      };
      var location = locationDomain.construct(locationDataObject);

      expect(location.id).to.equal(1);
      expect(typeof location.purchaseTroops).to.equal('function');
      done();
    });
});

suite ('purchaseTroops', function(){
  test('purchasing troops removes gold and adds troop to location', function(done) {
    var updateLocationSpy = sinon.spy();
    sinon.stub(locationClient, 'updateLocation', updateLocationSpy);
    var location = locationDomain.construct(locationFixture);
    var callback = function(){};
    location.purchaseTroops(1, callback);
    expect(location.troops.soldiers.amount).to.equal(101);
    expect(location.resources.gold.amount).to.equal(100);
    expect(updateLocationSpy.calledWith(location, callback)).to.equal(true);
    locationClient.updateLocation.restore();
    done();
  });
});