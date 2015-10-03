'use strict';
var troopForm = require('../config/forms/troop-form').purchaseTroops;
var service = require('../resources/headquarters');

var getLocationPreHandler = function(request, reply) {
  var user = request.session.get('user');
  if (!user) {
    reply();
  } else {
    service.getAllLocationData(user.id, request.params.locationId, reply);
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
          reply.view(viewPath, {location: location, troopForm: form.toHTML()})
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

