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
            xCoordinate: 5,
            yCoordinate: 9
        };

        var location = locationDomain.construct(locationDataObject);

    });
});