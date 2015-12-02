'use strict';

var db = require('../../config/database/setup');
var Promise = require('promise');


module.exports.create = function(user, callback) {
  Promise.all([
    db.User.create({username: user.username, password: user.password}),
    db.Location.create({xCoordinate: user.locations[0].xCoordinate, yCoordinate: user.locations[0].yCoordinate}),
    db.Troops.findOne({where: {type: 0}}),
    db.Resources.findOne({where: {type: 0}})
  ]).then(function(response) {
    return Promise.all([
      response[1].addResource(response[3], {amount: user.locations[0].resources.gold.amount}),
      response[1].addTroop(response[2], {amount: user.locations[0].troops.soldiers.amount})
    ]).then(function () {
      return response[0].addLocation(response[1]);
    })
  }).then(function(user) {
    callback(user);
  });
};

module.exports.getUser = function(loginInfo, callback) {
  db.User.findOne({
    where: {username: loginInfo.username}
  })
  .then(function(user) {
    if (user) {
      user.getLocations().then(function(locations) {
        user.locations = locations;
        console.log(user);
        callback(user, user.password);
      })
    } else {
      callback(null);
    }
  });
};

