'use strict';
var db = require('../database/mysqlDatabase');
var createCoordinate = function() {
  var coord = Math.random() * 10;
  return Math.floor(coord);
};

var init = function(userData, callback) {
    db.User.create(userData).then(function(user) {
        db.Location.create({xCoordinate: createCoordinate(), yCoordinate: createCoordinate()}).then(function(location){
            user.addLocation(location).then(function(){
                callback();
            })
        })
    });
};

module.exports.initializeAccount = init;

