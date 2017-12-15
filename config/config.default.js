'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1512990481036_3391';

  // add your config here
  config.middleware = [];
//配置mongodb的链接地址
  config.mongoose = {
    url: 'mongodb://127.0.0.1/ele',
    options: {}
  };

  config.security = {
    csrf: false,
    methodnoallow: {
      enable: false
    }, 
  };

  config.cors = {
    // - {String|Function(ctx)} origin `Access-Control-Allow-Origin`, default is request Origin header
    // *  - {String|Array} allowMethods `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
    // *  - {String|Array} exposeHeaders `Access-Control-Expose-Headers`
    // *  - {String|Array} allowHeaders `Access-Control-Allow-Headers`
    // *  - {String|Number} maxAge `Access-Control-Max-Age` in seconds
    // *  - {Boolean} credentials `Access-Control-Allow-Credentials`
    // *  - {Boolean} keepHeadersOnError Add set headers to `err.header` if an error is thrown
   origin: 'http://127.0.0.1:9010',//此处要实现跨域session必须设置域名不能设置成*
   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
   credentials:true,
  };
  return config;
};
