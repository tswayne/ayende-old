var db = require('../config/database/setup');
var Promise = require('promise');

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

module.exports.getLocationsForUser = getLocationsForUser;
module.exports.getAllLocationData = getAllLocationData;
