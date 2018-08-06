const Sequelize = require('sequelize');

exports = module.exports = function leadgenConnection(config) {
  const connection = new Sequelize(config.get('leadgen.dbUrl'), {
    logging: false,
    define: {
      schema: config.get('leadgen.schema'),
      freezeTableName: true,
    }
  });

  return connection;
};

exports['module-name'] = 'leadgenConnection';

exports['module-dependencies'] = [
  'config',
];

exports['module-type'] = 'factory';
