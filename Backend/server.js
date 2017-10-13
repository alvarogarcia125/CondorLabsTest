//Require
global.config = require('./config'); //Config Settings
const Hapi = require('hapi');
const requireDir = require('require-dir');
const inert = require('inert');
const server = new Hapi.Server();

// Create a server with a host and port
server.connection({
    port: global.config.application.port
});

//Registering Plugins
server.register([inert], function (err) {

  if (err) {server.log('An error ocurred trying to register the plugins' + err);}

  //Routes
  var routes = requireDir('./src/routes');
  for (var route in routes) {
    server.route(routes[route]);
  }
});

// Start the server
server.start((err) => {
  if (err) {throw err;}
  console.info('Server running in port: ', global.config.application.port);
});
