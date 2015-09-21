'use strict';
var db = require('../config/database/setup');
var Promise = require('promise');
var createCoordinate = function() {
  var coord = Math.random() * 10;
  return Math.floor(coord);
};

var init = function(userData, callback) {
  Promise.all({
    user : db.User.create(userData),
    troops : db.Troops.findOne({type: 0}),
    resources : db.Resources.findOne({type: 0})
  }).then(function(response) {
    return response.location.addResource(response.resources, {amount: 1000});
  }).then(function(){
      return response.location.addTroop(response.troops, {amount: 100})
  }).then(function(){
      return response.user.addLocation(response.location)
  }).nodeify(callback);
};

var validate = function(loginInfo, callback) {
    db.User.findOne({username: loginInfo.username})
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
