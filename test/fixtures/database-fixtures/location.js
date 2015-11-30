'use strict';

module.exports.getLocationFixture = function() {
  return{
    id: 1,
    xCoordinate: 5,
    yCoordinate: 9,
    troops: {
      soldiers: {
        id: 1,
        type: 'Soldiers',
        cost: 100,
        amount: 100
      }
    },
    resources: {
      gold: {
        id: 1,
        type: 'Gold',
        amount: 200
      }
    }
  }
};