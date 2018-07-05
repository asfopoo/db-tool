const { join } = require('path');

const config = require(join(__dirname, 'config'));

const opn = require('opn');

const express = require('express');

const app = express();

const webpack = require('webpack');

const webpackConfig = require('./webpack.dev.js');

const compiler = webpack(webpackConfig);

const { port } = config;

const connect = require('connect-history-api-fallback');

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  quiet: true,
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000,
});

compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

app.use(connect());

app.use(devMiddleware);

app.use(hotMiddleware);

const staticPath = join(config.publicPath, config.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = `http://localhost:${port}`;

devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at ${uri}\n`);
  opn(uri);
});

const server = app.listen(port);
