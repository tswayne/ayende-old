'use strict';

var decorate = function(resource) {
  return resource;
};

module.exports.construct = function(resourceDataObject) {
  return decorate(resourceDataObject);
};
