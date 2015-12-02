'use strict';
var db = require('../../config/database/setup');
var Promise = require('promise');

module.exports.getLocationsForUser = function(userId, callback) {
  db.Location.findAll({
    where: {
      userId: userId
    }
  }).then(function(locations) {
    callback(locations);
  });
};

module.exports.getAllLocationData = function(userId, locationId, callback) {
  db.Location.findOne({
    where: {
      id: locationId,
      userId: userId
    }
  }).then(function(location) {
    if (!location) {
      callback(null)
    } else {
      Promise.all([
        location.getTroops(),
        location.getResources(),
        location.getAttacks()
      ]).then(function(results) {
        location.troops = results[0];
        location.resources = results[1];
        location.attacks = results[2];
        callback(location)
      });

    }
  })
};

module.exports.updateLocation = function(location, callback) {
  db.Location.findOne({
    where: {
      id: location.id
    }
  }).then(function(locationDbObject) {
    if (!locationDbObject) {
      callback(new Error('No location found with id: ', location.id))
    } else {
      Promise.all([
        locationDbObject.getTroops(),
        locationDbObject.getResources()
      ]).then(function(results) {
        var soldiers = results[0][0].locationsTroops;
        soldiers.amount = location.troops.soldiers.amount;
        var gold = results[1][0].locationsResources;
        gold.amount = location.resources.gold.amount;

        Promise.all([
          soldiers.save(),
          gold.save()
        ]).then(function() {
          callback(null, location)
        });
      });
    }
  });

};