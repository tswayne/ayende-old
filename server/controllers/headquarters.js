var locationClient = require('../library/clients/headquarters');
var troopForm = require('../config/forms/troop-form').purchaseTroops;
var locationMapper = require('../library/domain-models/mappers/locationMapper');

var indexAction = {
  auth: 'session',
  handler:  function(request, reply)
  {
    var user = request.session.get('user');
    if (!user) {
      reply.redirect('/');
    } else {
      locationClient.getLocationsForUser(user.id, function(locations) {
        reply.view('headquarters/index', {locations: locations});
      });
    }
  }
};

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

var locationAction = {
  auth: 'session',
  pre: [
    { method: getLocationPreHandler, assign: 'location' }
  ],
  handler: function(request, reply)
  {
    var location = request.pre.location;

    if (!location) {
      reply.redirect('/headquarters');
    } else {
      reply.view('headquarters/location', {location: location, troopForm: troopForm.toHTML()});
    }
  }
};

module.exports.index = indexAction;
module.exports.location = locationAction;
