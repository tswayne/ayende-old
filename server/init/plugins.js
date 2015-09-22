
var registerPlugins = function(server, callback) {
  var plugins = [
    require('hapi-auth-cookie'),
    require('inert'),
    require('vision'),
    {
      register: require('yar'),
      options: {
        name: 'ayende-session',
        maxCookieSize: 0,
        cookieOptions: {
          password: 'password',
          isSecure: false
        }
      }
    }
  ];

  server.register(plugins, function(err){
    server.auth.strategy('session', 'cookie', {
      password: 'secret',
      cookie: 'ayente',
      redirectTo: '/',
      isSecure: false
    });
    callback();
  });


};

module.exports.registerPlugins = registerPlugins;