var vision = require('vision');

var registerPlugins = function(server, callback) {
  server.register(vision, callback)
};

module.exports.registerPlugins = registerPlugins;