// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

var remotedev = require('remotedev-server');

const REDUX_REMOTE_TOOLS_PORT = 8000;

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

var WebpackDevServer = require('webpack-dev-server'),
  webpack = require('webpack'),
  config = require('../webpack.config'),
  env = require('./env'),
  path = require('path');

var options = config.chromeExtensionBoilerplate || {};
var excludeEntriesToHotReload = options.notHotReload || [];

for (var entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] = [
      'webpack-dev-server/client?http://localhost:' + env.PORT,
      'webpack/hot/dev-server',
    ].concat(config.entry[entryName]);
  }
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
  config.plugins || []
);

delete config.chromeExtensionBoilerplate;

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: path.join(__dirname, '../build'),
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  disableHostCheck: true,
});

// change port to change redux remote dev tools port
remotedev({ hostname: 'localhost', port: REDUX_REMOTE_TOOLS_PORT });

server.listen(env.PORT);
