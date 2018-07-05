const Sequelize = require('sequelize');

exports = module.exports = function InternalRolePermissions(connection){
  const InternalRolePermissionsModel = connection.define('internal_role_permissions', {
    roleId: {
      type: Sequelize.BIGINT,
      field: 'role_id',
    },
    permissionId: {
      type: Sequelize.BIGINT,
      field: 'permission_id',
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });

  return InternalRolePermissionsModel.schema('rlinternal');
};

exports['module-name'] = 'InternalRolePermissionsModel';

exports['module-dependencies'] = [
  'connection',
];

exports['module-type'] = 'factory';
