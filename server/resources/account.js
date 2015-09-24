'use strict';
var db = require('../config/database/setup');
var bcrypt = require('bcrypt');
var Promise = require('promise');
var createCoordinate = function() {
  var coord = Math.random() * 10;
  return Math.floor(coord);
};

var init = function(userData, callback) {
  userData.password = bcrypt.hashSync(userData.password, 6);

  Promise.all([
     db.User.create(userData),
     db.Location.create({xCoordinate: createCoordinate(), yCoordinate: createCoordinate()}),
     db.Troops.findOne({where: {type: 0}}),
     db.Resources.findOne({where: {type: 0}})
  ]).then(function(response) {
    return Promise.all([
      response[1].addResource(response[3], {amount: 1000}),
      response[1].addTroop(response[2], {amount: 100})
    ]).then(function () {
      return response[0].addLocation(response[1]);
    })
  }).then(function(user) {
    callback(user);
  });
};

var validate = function(loginInfo, callback) {
    db.User.findOne({
      where: {username: loginInfo.username}
    })
      .then(function(user) {
        if (user && bcrypt.compareSync(loginInfo.password, user.password)) {
          user.getLocations().then(function(locations) {
            user.locations = locations;
            callback(user);
          })
        } else {
          callback(null);
        }
      });
};

module.exports.initializeAccount = init;
module.exports.validate = validate;

