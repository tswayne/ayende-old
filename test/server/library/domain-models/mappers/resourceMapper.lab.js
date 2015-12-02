'use strict';

var Code = require('code');
var expect = Code.expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var resourceFixture = require('../../../../fixtures/database-fixtures');
var resourceMapper = require('../../../../../server/library/domain-models/mappers/resourceMapper.js');

describe('map', function() {
  it('maps resource data to domain object', function (done) {
    var resourceDataBaseObject = resourceFixture.resource();
    var callback = function(err, resources) {
      expect(resources.gold.id).to.equal(1);
      expect(resources.gold.type).to.equal('Gold');
      expect(resources.gold.amount).to.equal(100);
      done();
    };

    resourceMapper.map(resourceDataBaseObject, callback);
  });

  it('returns with error for invalid resources', function (done) {
    var resourceDataBaseObject = [{
      id: 1,
      locationsResources: {
        amount: 100
      }
    }];

    var callback = function(err, resource) {
      expect(err).to.exist();
      done();
    };

    resourceMapper.map(resourceDataBaseObject, callback);
  });

  it('returns with error if array not passed to resource mapper', function (done) {
    var resourceDataBaseObject = {
      id: 1,
      type: 'Gold',
      locationsResources: {
        amount: 100,
        locationId: 1,
        resourceId: 1
      }
    };

    var callback = function(err, resource) {
      expect(err).to.exist();
      done();
    };

    resourceMapper.map(resourceDataBaseObject, callback);
  });

  it('returns with error if resource array is not expected size', function (done) {
    var resourceDataBaseObject = [];

    var callback = function(err, resource) {
      expect(err).to.exist();
      done();
    };

    resourceMapper.map(resourceDataBaseObject, callback);
  });

  it('returns with error for invalid resources for data object without nested locations resources', function (done) {
    var resourceDataBaseObject = [{
      id: 1,
      type: 'Gold',
      cost: 500
    }];

    var callback = function(err, resource) {
      expect(err).to.exist();
      done();
    };

    resourceMapper.map(resourceDataBaseObject, callback);
  });
});