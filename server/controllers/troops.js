'use strict';
var troopForm = require('../config/forms/troop-form').purchaseTroops;
var locationClient = require('../library/clients/headquarters');
var locationMapper = require('../library/domain-models/mappers/locationMapper');

var getLocationPreHandler = function(request, reply) {
  var user = request.session.get('user');
  if (!user) {
    reply();
  } else {

    locationClient.getAllLocationData(user.id, request.params.locationId, function(location) {
      locationMapper.map(location, reply);
    });
  }
};

module.exports.purchaseTroops = {
  auth: 'session',
  pre: [
    { method: getLocationPreHandler, assign: 'location' }
  ],
  handler: function(request, reply) {
    var viewPath  = "headquarters/location";
    var location = request.pre.location;

    if (!location) {
      reply.redirect('/headquarters');
    } else {
      troopForm.handle(request.payload, {
        success: function (form) {
          form.data.soldierAmount = Math.round(form.data.soldierAmount);
          location.purchaseTroops(form.data.soldierAmount, function(err, updatedLocation){
            var purchaseError;
            if (err) {
              purchaseError = 'Not enough gold to purchase troops!';
            }
            reply.view(viewPath, {location: updatedLocation, troopForm: form.toHTML(), purchaseError: purchaseError})
          });
        },
        error: function (form) {
          reply.view(viewPath, {location: location, troopForm: form.toHTML()})
        },
        empty: function (form) {
          reply.view(viewPath, {location: location, troopForm: form.toHTML()})
        }
      });
    }
  }
};

