const webpack = require('webpack');

const webpackConfig = require('./webpack.prod.js');

const chalk = require('chalk');

const { join } = require('path');

const rimraf = require('rimraf');

rimraf(join(__dirname, '..', 'dist'), err => {
  webpack(webpackConfig, (err, stats) => {
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1)
    }
  });
});
