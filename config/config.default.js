'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1512990481036_3391';

  // add your config here
  config.middleware = [];

  config.mongoose = {
    url: 'mongodb://127.0.0.1/ele',
    options: {}
  };

  config.security = {
    csrf: false,
  };

  config.cors = {
    origin: '*',
   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  return config;
};
