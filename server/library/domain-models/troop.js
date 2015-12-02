'use strict';

var decorate = function(troop) {
  return troop;
};

module.exports.construct = function(troopDataObject) {
  return decorate(troopDataObject);
};
