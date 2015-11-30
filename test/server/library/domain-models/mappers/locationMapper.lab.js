'use strict';

var Code = require('code');
var expect = Code.expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var sinon = require('sinon');
var describe = lab.describe;
var it = lab.it;
var locationMapper = require('../../../../../server/library/domain-models/mappers/locationMapper.js');
var databaseFixture = require('../../../../fixtures/database-fixtures');


describe('map', function() {
  it('maps location data to domain object', function (done) {
    var locationDataObject = {
      id: 1,
      xCoordinate: 5,
      yCoordinate: 9
    };

    var callback = function(err, location) {
      expect(location.id).to.equal(1);
      expect(location.xCoordinate).to.equal(5);
      expect(location.yCoordinate).to.equal(9);
      done();
    };

    locationMapper.map(locationDataObject, callback);
  });

  it('maps empty dependencies to empty objects', function (done) {
    var locationDataObject = {
      id: 1,
      xCoordinate: 5,
      yCoordinate: 9
    };

    var callback = function(err, location) {
      expect(location.id).to.equal(1);
      expect(location.troops).to.deep.equal({});
      expect(location.resources).to.deep.equal({});
      done();
    };

    locationMapper.map(locationDataObject, callback);
  });

  it('returns with error for invalid location', function (done) {
    var locationDataObject = {
      xCoordinate: 5
    };

    var callback = function(err, location) {
      expect(err).to.exist();
      done();
    };

    locationMapper.map(locationDataObject, callback);
  });


  it('maps locations troops when troop data exists', function (done) {
    var locationDataObject = {
      id: 1,
      xCoordinate: 5,
      yCoordinate: 9,
      troops: [{
        id: 1,
        type: 'Soldiers',
        cost: 500,
        locationsTroops: {
          amount: 100,
          locationId: 1,
          troopId: 1
        }
      }]
    };

    var callback = function(err, location) {
      expect(location.id).to.equal(1);
      expect(location.troops.soldiers.type).to.equal('Soldiers');
      done();
    };

    locationMapper.map(locationDataObject, callback);
  });

  it('maps locations resources when resource data exists', function (done) {
    var locationDataObject = {
      id: 1,
      xCoordinate: 5,
      yCoordinate: 9,
      resources: databaseFixture.resource()
    };

    var callback = function(err, location) {
      expect(location.id).to.equal(1);
      expect(location.resources.gold.type).to.equal('Gold');
      done();
    };

    locationMapper.map(locationDataObject, callback);
  });
});