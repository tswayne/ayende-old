var homeController = require('./controllers/home');
var headquartersController = require('./controllers/headquarters');
var assetsController = require('./controllers/assets');
var accountController = require('./controllers/account')

var addRoutes = function(server) {
    server.route([
      {method: 'GET', path: '/', config: homeController.index},
      {method: 'GET', path: '/headquarters', config: headquartersController.index},
      {method: 'GET', path: '/headquarters/location/{locationId}', config: headquartersController.location},
      {method: 'GET', path: '/bower_components/{path*}', config: assetsController.bower},
      {method: 'GET', path: '/create-account', config: accountController.create},
      {method: 'POST', path: '/create-account', config: accountController.save},
      {method: 'GET', path: '/logout', config: accountController.logout},
      {method: 'POST', path: '/login', config: accountController.login}
    ]);
};

module.exports.addRoutes = addRoutes;