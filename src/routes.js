var homeController = require('./controllers/home');
var headquartersController = require('./controllers/headquarters');
var assetsController = require('./controllers/assets');
var accountController = require('./controllers/account')

var addRoutes = function(server) {
    server.route([
      {method: 'GET', path: '/', config: homeController.index},
      {method: 'GET', path: '/create-account', config: accountController.create},
      {method: 'POST', path: '/create-account', config: accountController.save},
      {method: 'GET', path: '/headquarters', config: headquartersController.index},
      {method: 'GET', path: '/bower_components/{path*}', config: assetsController.bower}
    ]);
};

module.exports.addRoutes = addRoutes;