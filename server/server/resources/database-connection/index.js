const Sequelize = require('sequelize');

exports = module.exports = function databaseConnection(config) {
  const connection = new Sequelize(config.get('db.dbUrl'), {
    logging: false,
    define: {
      schema: config.get('db.schema'),
      freezeTableName: true,
    }
  });

  return connection;
};

exports['module-name'] = 'connection';

exports['module-dependencies'] = [
  'config',
];

exports['module-type'] = 'factory';
