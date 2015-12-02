'use strict';

var bcrypt = require('bcryptjs');


var createCoordinate = function() {
  var coord = Math.random() * 10;
  return Math.floor(coord);
};

module.exports.initialize = function(username, password) {
  return {
    username: username,
    password: bcrypt.hashSync(password, 6),
    locations: [{
      xCoordinate: createCoordinate(),
      yCoordinate: createCoordinate(),
      troops: {
        soldiers: {
          amount: 25
        }
      },
      resources: {
        gold: {
          amount: 1000
        }
      }
    }]
  }
};