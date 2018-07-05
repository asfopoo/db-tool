const { join } = require('path');

const env = process.env.NODE_ENV;

const defaultEnv = 'development';

const config = {
  production:{
    env: {
      NODE_ENV: '"production"',
    },
    assetsSubDirectory: 'static',
    distDirectory: 'dist',
    root: join(__dirname, '..', '..', '/dist'),
    publicPath: '/',
    sourceMap: true,
  },
  local: {
    env: {
      NODE_ENV: '"local"',
    },
    port: 8061,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    publicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    sourceMap: false
  },
  development: {
    env: {
      NODE_ENV: '"development"',
    },
    port: 8061,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    publicPath: '/',
    proxyTable: {},
    root: join(__dirname, '..', '..', '/dist'),
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    sourceMap: false
  },
  demo: {
    env: {
      NODE_ENV: '"demo"',
    },
    port: 8061,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    publicPath: '/',
    proxyTable: {},
    root: join(__dirname, '..', '..', '/dist'),
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    sourceMap: false
  },
  doc: {
    env: {
      NODE_ENV: '"doc"',
    },
    port: 8061,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    publicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    sourceMap: false
  },
};

if(env != null && config.hasOwnProperty(env) ){
  module.exports = config[env];
} else {
  module.exports = config[defaultEnv];
}
