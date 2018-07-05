if (process.env.NODE_ENV === 'production' || (location && location.hostname !== 'localhost')) {
  module.exports = require('./configure-store-prod');
} else {
  module.exports = require('./configure-store-dev');
}
