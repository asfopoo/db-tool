const Sequelize = require('sequelize');

exports = module.exports = function InternalPermissions(connection){
  const InternalPermissionsModel = connection.define('internal_permissions', {
    permissionId: {
      type: Sequelize.BIGINT,
      field: 'permission_id',
      primaryKey: true,
    },
    permissionName: {
      type: Sequelize.STRING(100),
      field: 'permission_name',
    },
    permissionDescription: {
      type: Sequelize.TEXT,
      field: 'permission_description',
    },
    moduleId: {
      type: Sequelize.BIGINT,
      field: 'module_id',
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });

  return InternalPermissionsModel.schema('rlinternal');
};

exports['module-name'] = 'InternalPermissionsModel';

exports['module-dependencies'] = [
  'connection',
];

exports['module-type'] = 'factory';
