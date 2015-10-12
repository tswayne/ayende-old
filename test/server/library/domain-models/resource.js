'use strict';

var Code = require('code');
var expect = Code.expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var resourceDomain = require('../../../../server/library/domain-models/resource.js');
var fixture = require('../../../fixtures/resourceFixture');

describe('construct', function() {
  it('creates resource domain model', function (done) {
    var resourceDataObject = fixture.getResourceFixture();

    var resource = resourceDomain.construct(resourceDataObject);

    expect(resource.id).to.equal(1);
    done();
  });
});