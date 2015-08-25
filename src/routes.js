var homeController = require('./controllers/home');

var addRoutes = function(server) {
    server.route([
      {method: 'GET', path: '/', config: homeController.index}
    ]);
};

module.exports.addRoutes = addRoutes;