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

var validate = function(loginInfo, callback) {
    db.User.findOne({username: loginInfo.username}).then(function(user) {
        if (user && request.payload.password == user.password) {
            callback(true);
        } else {
            callback(false);
        }
    });
};

module.exports.initializeAccount = init;
module.exports.validate = validate;
