'use strict';

module.exports.getResourceFixture = function() {
  return [{
    id: 1,
    type: 'Gold',
    locationsResources: {
      amount: 100,
      locationId: 1,
      resourceId: 1
    }
  }];
};