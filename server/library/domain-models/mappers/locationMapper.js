'use strict';

var Joi = require('joi');
var locationSchema = require('../../../config/joi/locationSchema').schema;
var location = require('../location');
var async = require('async');
var troopMapper = require('./troopMapper');
var resourceMapper = require('./resourceMapper');

module.exports.map = function(locationData, callback) {
  var locationDataObject = {
    id: locationData.id,
    xCoordinate: locationData.xCoordinate,
    yCoordinate: locationData.yCoordinate
  };

  return Joi.validate(locationDataObject, locationSchema, function(err, validatedLocationDataObject) {
    if (err) {
      return callback(err, null);
    }
    async.parallel({
      troops: function(asyncCallback) {
        troopMapper.map(locationData.troops, asyncCallback);
      },
      resources: function(asyncCallback) {
        resourceMapper.map(locationData.resources, asyncCallback);
      }
    }, function(err, results) {
      if (err) {
        return callback(err);
      }

      validatedLocationDataObject.troops = results.troops;
      validatedLocationDataObject.resources = results.resources;

      return callback(err, location.construct(validatedLocationDataObject));
    });
  });
};

module.exports.construct = function() {
  return location.construct({
    xCoordinate: 0,
    yCoordinate: 0,
    troops: troopMapper.construct(),
    resources: resourceMapper.construct()
  });
};