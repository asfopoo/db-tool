const Sequelize = require('sequelize');

exports = module.exports = function InternalModules(connection){
  const InternalModulesModel = connection.define('internal_modules', {
    moduleId: {
      type: Sequelize.BIGINT,
      field: 'module_id',
    },
    moduleName: {
      type: Sequelize.STRING(100),
      field: 'module_name',
    },
    moduleDescription: {
      type: Sequelize.TEXT,
      field: 'module_description'
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });

  return InternalModulesModel.schema('rlinternal');
};

exports['module-name'] = 'InternalModulesModel';

exports['module-dependencies'] = [
  'connection',
];

exports['module-type'] = 'factory';
