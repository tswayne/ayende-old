'use strict';

var Joi = require('joi');
var troopSchema = require('../../../config/joi/troopSchema').schema;
var troop = require('../troop');
var async = require('async');
var _ = require('lodash');

var mapIndividualTroop = function(troopData, index, callback) {
  try {
    var troopDataObject = {
      id: troopData[index].id,
      type: troopData[index].type,
      cost: troopData[index].cost,
      amount: troopData[index].locationsTroops.amount
    };
  } catch (mapError) {
    return callback(mapError, null);
  }
  return Joi.validate(troopDataObject, troopSchema, function(err, validatedTroopDataObject) {
    if (err) {
      return callback(err);
    }
    return callback(null, troop.construct(validatedTroopDataObject));
  });
};


module.exports.map = function(troopData, callback) {
  if (!troopData) {
    return callback(null, {});
  }

  if (!_.isArray(troopData)) {
    return callback(new Error('Invalid troop array passed to map'));
  }

  async.parallel({
    soldiers: function(asyncCallback) {
      mapIndividualTroop(troopData, 0, asyncCallback)
    }
  }, function(err, results) {
    if (err) {
      return callback(err);
    }
    var troops = {};
    if (results.soldiers) {
      troops.soldiers = results.soldiers;
    }
    return callback(err, troops);
  });
};
