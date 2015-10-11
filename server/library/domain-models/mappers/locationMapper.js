'use strict';

var Joi = require('joi');
var locationSchema = require('../../../config/joi/locationSchema').schema;
var location = require('../location');
var async = require('async');
var troopMapper = require('./troopMapper');

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
      soldiers: function(asyncCallback) {
        if (locationData.troops && locationData.troops.length > 0) {
          troopMapper.map(locationData.troops[0], asyncCallback)
        } else {
          asyncCallback(null, null)
        }
      }
    }, function(err, results) {
      if (err) {
        return callback(err);
      }
      validatedLocationDataObject.troops = {};
      if (results.soldiers) {
        validatedLocationDataObject.troops.soldiers = results.soldiers;
      }
      return callback(err, location.construct(validatedLocationDataObject));
    });
  });
};