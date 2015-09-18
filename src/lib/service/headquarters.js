var db = require('../database/mysqlDatabase');

var getLocationsForUser = function(userId, callback) {
    db.Location.findAll({userId: userId}).then(function(locations) {
      callback(locations);
    })
};

var getAllLocationData = function(userId, locationId, callback) {
    db.Location.findOne({id: locationId, userId: userId}).then(function(location) {
        if (!location) {
            callback(null)
        } else {
            callback(location);
        }
    })
};

module.exports.getLocationsForUser = getLocationsForUser;
module.exports.getAllLocationData = getAllLocationData;