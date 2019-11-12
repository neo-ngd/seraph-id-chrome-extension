// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

const DEFAULT_ENV = 'development';
const DEFAULT_PORT = 3000;

module.exports = {
  NODE_ENV: process.env.NODE_ENV || DEFAULT_ENV,
  PORT: process.env.PORT || DEFAULT_PORT,
};
