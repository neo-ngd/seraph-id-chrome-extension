// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

const PROD_ENV = 'production';

process.env.BABEL_ENV = PROD_ENV;
process.env.NODE_ENV = PROD_ENV;

var webpack = require('webpack'),
  config = require('../webpack.config');

delete config.chromeExtensionBoilerplate;

webpack(config, (e) => {
  if (e) throw e;
});
