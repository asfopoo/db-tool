const {
  join,
  resolve,
} = require('path');

const webpack = require('webpack');

const baseWebpackConfig = require('./webpack.base.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');

const helpers = require('./helpers.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require(join(__dirname, 'config'));

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: helpers.styleLoaders({
      sourceMap: config.productionSourceMap,
      extract: true
    })
  },
  mode: 'production',
  output: {
    path: config.root,
    filename: helpers.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: helpers.assetsPath('js/[name].[chunkhash].js')
  },
  devtool: "#source-map",
  plugins: [
    new ExtractTextPlugin({
      filename: helpers.assetsPath('css/style.css'),
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': config.env,
    }),
    new HtmlWebpackPlugin({
      template: join(__dirname, 'templates', 'index.html'),
      inject: true,
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
  ],
  optimization:{
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial",
          minChunks: 1,
          test: join(__dirname, "../node_modules")
        }
      }
    }
  }
});
