var vision = require('vision');

var registerPlugins = function(server, callback) {
  server.register(require('hapi-auth-cookie'), function (err) {
    server.auth.strategy('session', 'cookie', {
      password: 'secret',
      cookie: 'ayente',
      redirectTo: '/',
      isSecure: false
    });
  });

  server.register(require('inert'), function() {
    server.register(vision, callback);
  });
};

module.exports.registerPlugins = registerPlugins;