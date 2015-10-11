'use strict';

var Code = require('code');
var expect = Code.expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var sinon = require('sinon');
var describe = lab.describe;
var it = lab.it;
var troopMapper = require('../../../../../server/library/domain-models/mappers/troopMapper.js');

describe('map', function() {
  it('maps troop data to domain object', function (done) {
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
      expect(troop.id).to.equal(1);
      expect(troop.type).to.equal('Soldiers');
      expect(troop.cost).to.equal(500);
      expect(troop.amount).to.equal(100);
      done();
    };

    troopMapper.map(troopDataBaseObject, callback);
  });

  it('returns with error for invalid location', function (done) {
    var troopDataBaseObject = {
      id: 1,
      type: 'Soldiers',
      locationsTroops: {
        amount: 100
      }
    };

    var callback = function(err, troop) {
      expect(err).to.exist();
      done();
    };

    troopMapper.map(troopDataBaseObject, callback);
  });

  it('returns with error for invalid location for location without nested object', function (done) {
    var troopDataBaseObject = {
      id: 1,
      type: 'Soldiers',
      cost: 500
    };

    var callback = function(err, troop) {
      expect(err).to.exist();
      done();
    };

    troopMapper.map(troopDataBaseObject, callback);
  });
});