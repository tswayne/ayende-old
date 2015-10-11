'use strict';

var decorate = function(location) {
  return location;
};

module.exports.construct = function(locationDataObject) {
  return decorate(locationDataObject);
};
