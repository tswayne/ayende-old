var db = require('../../config/database/setup');
var Promise = require('promise');
var resources = require('../../resources/resources');

var getLocationsForUser = function(userId, callback) {
    db.Location.findAll({
        where: {
            userId: userId
        }
    }).then(function(locations) {
        callback(locations);
    });

};

var getAllLocationData = function(userId, locationId, callback) {
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

module.exports.purchaseTroopsForLocation = function(location, requestedAmount, troopType, callback) {
    var troopCost = location.troops[troopType].cost;
    var locationGold = location.resources[resources.goldIndex].locationsResources.amount;
    var purchaseTotal = troopCost * requestedAmount;

    if (locationGold < purchaseTotal ) {
        return callback({type: 'notEnough'}, location);
    }

    location.troops[troopType].locationsTroops.amount += requestedAmount;
    location.resources[resources.goldIndex].locationsResources.amount -= purchaseTotal;
    Promise.all([
        location.troops[troopType].locationsTroops.save(),
        location.resources[resources.goldIndex].locationsResources.save()
    ]).then(function(){
        callback(null, location);
    });

};

module.exports.getLocationsForUser = getLocationsForUser;
module.exports.getAllLocationData = getAllLocationData;
