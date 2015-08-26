var Hapi = require('hapi');
var router = require('./src/routes');
var plugins = require('./src/plugins');
var server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 5000
});

router.addRoutes(server);

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
  server.start(function() {
    console.log('Server running at:', server.info.uri);
  });
});
