var service = require('../lib/service/headquarters');



var indexAction = {
  auth: 'session',
  handler:  function(request, reply)
  {
    var user = request.session.get('user');
    if (!user) {
      reply.redirect('/');
    } else {
      service.getLocationsForUser(user.id, function(locations) {
        reply.view('headquarters/index', {locations: locations});
      });
    }
  }
};

var getLocationPreHandler = function(request, reply) {
  var user = request.session.get('user');
  if (!user.id) {
    reply();
  } else {
    service.getAllLocationData(user.id, request.params.locationId, reply);
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
      console.log(location);
      reply.view('headquarters/location', {location: location});
    }
  }
};

module.exports.index = indexAction;
module.exports.location = locationAction;