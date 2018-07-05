const Sequelize = require('sequelize');

exports = module.exports = function InternalRoles(connection){
  const InternalRolesModel = connection.define('internal_roles', {
    roleId: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      field: 'role_id',
    },
    roleName: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'role_name',
    },
    roleDescription: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'role_description',
    },
  }, {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  });

  return InternalRolesModel.schema('rlinternal');
};

exports['module-name'] = 'InternalRolesModel';

exports['module-dependencies'] = [
  'connection',
];

exports['module-type'] = 'factory';
