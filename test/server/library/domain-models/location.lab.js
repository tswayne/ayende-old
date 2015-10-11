'use strict';

var Code = require('code');
var expect = Code.expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var locationDomain = require('../../../../server/library/domain-models/location.js');

describe('construct', function() {
    it('creates location domain model', function (done) {
      var locationDataObject = {
        id: 1,
        xCoordinate: 5,
        yCoordinate: 9
      };
      var location = locationDomain.construct(locationDataObject);

      expect(location.id).to.equal(1);
      expect(location.xCoordinate).to.equal(5);
      expect(location.yCoordinate).to.equal(9);
      done();
    });
});