const webpack = require('webpack');

const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const {
  join,
  resolve,
} = require('path');

const reloadClientPath = join(__dirname, 'reload-client.js');

const helpers = require('./helpers');

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [`${reloadClientPath}`].concat(baseWebpackConfig.entry[name])
});

const config = require(join(__dirname, 'config'));

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: helpers.styleLoaders()
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: join(__dirname, 'templates', 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': config.env,
    }),
    function () {
      this.plugin("done", function (stats) {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
          console.log(stats.compilation.errors);
          process.exit(1); // or throw new Error('webpack build failed.');
        }
      });
    }
  ],
});
