'use strict';

var Joi = require('joi');
var resourceSchema = require('../../../config/joi/resourceSchema').schema;
var resource = require('../resource');
var async = require('async');
var _ = require('lodash');

var mapIndividualResource = function(resourceData, index, callback) {
  try {
    var resourceObject = {
      id: resourceData[index].id,
      type: resourceData[index].type,
      amount: resourceData[index].locationsResources.amount
    };
  } catch (mapError) {
    return callback(mapError, null);
  }
  return Joi.validate(resourceObject, resourceSchema, function(err, validatedResourceObject) {
    if (err) {
      return callback(err);
    }
    return callback(null, resource.construct(validatedResourceObject));
  });
};


module.exports.map = function(resourceData, callback) {
  if (!resourceData) {
    return callback(null, {});
  }

  if (!_.isArray(resourceData)) {
    return callback(new Error('Invalid resource array passed to map'));
  }

  async.parallel({
    gold: function(asyncCallback) {
      mapIndividualResource(resourceData, 0, asyncCallback)
    }
  }, function(err, results) {
    if (err) {
      return callback(err);
    }
    var resources = {};
    if (results.gold) {
      resources.gold = results.gold;
    }
    return callback(err, resources);
  });
};

module.exports.construct = function() {
  return {
    gold: resource.construct({
      id: 0,
      type: 'Gold',
      amount: 0
    })
  };
};