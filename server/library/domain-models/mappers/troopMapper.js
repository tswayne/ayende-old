'use strict';

var Joi = require('joi');
var troopSchema = require('../../../config/joi/troopSchema').schema;
var troop = require('../troop');


module.exports.map = function(troopData, callback) {

  try {
    var troopDataObject = {
      id: troopData.id,
      type: troopData.type,
      cost: troopData.cost,
      amount: troopData.locationsTroops.amount
    };
  } catch (mapError) {
    return callback(mapError, null);
  }
  return Joi.validate(troopDataObject, troopSchema, function(err, validatedTroopDataObject) {
    return callback(err, troop.construct(validatedTroopDataObject));
  });
};