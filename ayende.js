if (process.env.NEW_RELIC_KEY) {
  require('newrelic');
}
var Hapi = require('hapi');
var router = require('./src/routes');
var plugins = require('./src/plugins');
var server = new Hapi.Server();


server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || 5000
});

require('./src/lib/database/mysqlDatabase').init();

var registerViews = function(server) {
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'src/views',
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
