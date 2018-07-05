const Sequelize = require('sequelize');

exports = module.exports = function Role(connection) {

  const RoleModel = connection.define('roles', {
    roleId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      field: 'role_id'
    },
    shortRoleName: {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'short_role_name',
    },
    longRoleName: {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'long_role_name',
    },
    roleModuleId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      field: 'role_module_id',
    },
    enabled: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    accessRights:{
      allowNull: true,
      type: Sequelize.JSONB,
      field: 'access_rights',
    }
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true,
    scopes: {
      admin: {
        where: {
          roleId: [
            0,
            10,
            60,
            100,
          ],
        },
        raw: true,
      },
    },
  });

  return RoleModel.schema('auth');
};

exports['module-name'] = 'RoleModel';

exports['module-dependencies'] = [
  'connection',
];

exports['module-type'] = 'factory';
