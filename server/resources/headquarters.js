var db = require('../config/database/setup');

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
            location.getTroops().then(function(troops){
                location.troops = troops;
                callback(location);
            })
        }
    })
};

module.exports.getLocationsForUser = getLocationsForUser;
module.exports.getAllLocationData = getAllLocationData;