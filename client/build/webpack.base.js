const { join, resolve, } = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const helpers = require('./helpers');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: ['babel-polyfill', join(__dirname, '..', 'src', 'index.jsx')],
  },
  output: {
    path: join(__dirname, '..', 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          join(__dirname, '..', 'src'),
          join(__dirname, '..', 'docs')
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: helpers.assetsPath('img/[name].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: helpers.assetsPath('media/[name].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: helpers.assetsPath('fonts/[name].[ext]'),
        },
      },

    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [resolve(__dirname, '../src'), 'node_modules']
  },
  node: {
    fs: 'empty'
  }
};

