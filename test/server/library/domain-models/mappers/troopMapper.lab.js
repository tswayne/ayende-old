'use strict';

var Code = require('code');
var expect = Code.expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var troopMapper = require('../../../../../server/library/domain-models/mappers/troopMapper.js');

describe('map', function() {
  it('maps troop data to domain object', function (done) {
    var troopDataBaseObject = [{
      id: 1,
      type: 'Soldiers',
      cost: 500,
      locationsTroops: {
        amount: 100,
        locationId: 1,
        troopId: 1
      }
    }];

    var callback = function(err, troops) {
      expect(troops.soldiers.id).to.equal(1);
      expect(troops.soldiers.type).to.equal('Soldiers');
      expect(troops.soldiers.cost).to.equal(500);
      expect(troops.soldiers.amount).to.equal(100);
      done();
    };

    troopMapper.map(troopDataBaseObject, callback);
  });

  it('returns with error for invalid troops', function (done) {
    var troopDataBaseObject = [{
      id: 1,
      type: 'Soldiers',
      locationsTroops: {
        amount: 100
      }
    }];

    var callback = function(err, troop) {
      expect(err).to.exist();
      done();
    };

    troopMapper.map(troopDataBaseObject, callback);
  });

  it('returns with error if array not passed to troop mapper', function (done) {
    var troopDataBaseObject = {
      id: 1,
      type: 'Soldiers',
      cost: 500,
      locationsTroops: {
        amount: 100,
        locationId: 1,
        troopId: 1
      }
    };

    var callback = function(err, troop) {
      expect(err).to.exist();
      done();
    };

    troopMapper.map(troopDataBaseObject, callback);
  });

  it('returns with error if troop array is not expected size', function (done) {
    var troopDataBaseObject = [];

    var callback = function(err, troop) {
      expect(err).to.exist();
      done();
    };

    troopMapper.map(troopDataBaseObject, callback);
  });

  it('returns with error for invalid troops for data object without nested locations troops', function (done) {
    var troopDataBaseObject = [{
      id: 1,
      type: 'Soldiers',
      cost: 500
    }];

    var callback = function(err, troop) {
      expect(err).to.exist();
      done();
    };

    troopMapper.map(troopDataBaseObject, callback);
  });
});