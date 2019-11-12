// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

var webpack = require('webpack'),
  config = require('../webpack.config');

delete config.chromeExtensionBoilerplate;

webpack(config, (e) => {
  if (e) throw e;
});
