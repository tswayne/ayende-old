'use strict';

var locationClient = require('../clients/location');

var purchaseTroops = function(requestedAmount, callback) {

  var cost = this.troops.soldiers.cost;
  var locationsGold = this.resources.gold.amount;
  var purchaseTotal = cost * requestedAmount;

  if (locationsGold < purchaseTotal) {
    return callback(new Error('not enough resources'));
  }

  this.troops.soldiers.amount += requestedAmount;
  this.resources.gold.amount -= purchaseTotal;
  locationClient.updateLocation(this, callback);
};

var decorate = function(location) {
  location.purchaseTroops = purchaseTroops;
  return location;
};

module.exports.construct = function(locationDataObject) {
  return decorate(locationDataObject);
};
