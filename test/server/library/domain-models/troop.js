'use strict';

var Code = require('code');
var expect = Code.expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var locationDomain = require('../../../../server/library/domain-models/troop.js');
var fixture = require('../../../fixtures/troopFixture');

describe('construct', function() {
  it('creates troop domain model', function (done) {
    var troopDataObject = fixture.getTroopFixture();

    var troop = locationDomain.construct(troopDataObject);

    expect(troop.id).to.equal(1);
    done();
  });
});