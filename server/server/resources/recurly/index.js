const Recurly = require('recurly-node-api');

exports = module.exports = function RecurlyClient(config) {
  return Recurly(config.get('recurly'));
};

exports['module-name'] = 'RecurlyClient';

exports['module-dependencies'] = [
  'config',
];

exports['module-type'] = 'factory';
