var service = require('../lib/service/headquarters');

var getLocation = function(request, reply) {
  service.getAllLocationData(request.session.get('user').id, request.params.locationId, reply);
};

var indexAction = {
  auth: 'session',
  handler:  function(request, reply)
  {
    service.getLocationsForUser(request.session.get('user').id, function(locations) {
      reply.view('headquarters/index', {locations: locations});
    });
  }
};


var locationAction = {
  auth: 'session',
  pre: [
    { method: getLocation, assign: 'location' }
  ],
  handler: function(request, reply)
  {
    var location = request.pre.location;
    console.log(location);
    if (!location) {
      reply.redirect('/headquarters/index')
    }
    reply.view('headquarters/location');
  }
};

module.exports.index = indexAction;
module.exports.location = locationAction;