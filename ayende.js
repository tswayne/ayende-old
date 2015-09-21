if (process.env.NEW_RELIC_KEY) {
  require('newrelic');
}
var Hapi = require('hapi');
var router = require('./server/init/routes');
var plugins = require('./server/init/plugins');
var server = new Hapi.Server();


server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 5000
});

require('./server/config/database/setup').initializeAccount();

var registerViews = function(server) {
  server.views({
    engines: {
      hbs: require('handlebars')
    },
    path: 'server/views',
    layout: true
  });
};

plugins.registerPlugins(server, function(err){
  registerViews(server);
  router.addRoutes(server);
  server.start(function() {
    console.log('Server running at:', server.info.uri);
  });
});
