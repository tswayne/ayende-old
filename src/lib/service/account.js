'use strict';
var db = require('../database/mysqlDatabase');
var createCoordinate = function() {
  var coord = Math.random() * 10;
  return Math.floor(coord);
};

var init = function(userData, callback) {
    db.User.create(userData).then(function(user) {
        db.Location.create({xCoordinate: createCoordinate(), yCoordinate: createCoordinate()}).then(function(location){
            db.Troops.findOne({type: 0}).then(function(troops){
                db.Resources.findOne({type: 0}).then(function(resources){
                    location.addResource(resources, {amount: 1000}).then(function(){
                        location.addTroop(troops, {amount: 100}).then(function(){
                            user.addLocation(location).then(function(){
                                callback();
                            });
                        });
                    });
                });
            });
        });
    });
};

var validate = function(loginInfo, callback) {
    db.User.findOne({
        where: {
            username: loginInfo.username
        }
    })
      .then(function(user) {
        if (user && loginInfo.password == user.password) {
          user.getLocations().then(function(locations) {
              user.locations = locations;
            callback(true, user);
          })
        } else {
          callback(false);
        }
      });
};

module.exports.initializeAccount = init;
module.exports.validate = validate;
