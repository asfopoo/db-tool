exports = module.exports = function InternalModels(
  InternalUsersModel,
  InternalRolesModel,
  InternalRolePermissionsModel,
  InternalPermissionsModel,
  InternalModulesModel,
  TeamModel,
  UserModel,
  TeamUserModel
){
  InternalUsersModel.hasOne(InternalRolesModel, {
    foreignKey: 'roleId',
    targetKey: 'roleId',
    as: 'role',
  });

  InternalRolesModel.hasMany(InternalUsersModel, {
    foreignKey: 'roleId',
    targetKey: 'roleId',
    as: 'users',
  });

  InternalRolesModel.belongsToMany(InternalPermissionsModel, {
    through: InternalRolePermissionsModel,
  });

  InternalPermissionsModel.belongsToMany(InternalRolesModel, {
    through: InternalRolePermissionsModel,
  });

  InternalPermissionsModel.hasOne(InternalModulesModel, {
    as: 'module',
    foreignKey: 'permissionId',
    targetKey: 'permissionId',
  });

  InternalModulesModel.hasMany(InternalPermissionsModel, {
    as: 'permissions',
    foreignKey: 'permissionId',
    targetKey: 'permissionId',
  });

  TeamModel.belongsToMany(UserModel, {
    through: TeamUserModel,
    foreignKey: 'teamId',
  });

  UserModel.belongsToMany(TeamModel, {
    through: TeamUserModel,
    foreignKey: 'userId',
  });

  return {
    InternalUsersModel,
    InternalRolesModel,
    InternalRolePermissionsModel,
    InternalPermissionsModel,
    InternalModulesModel,
  };
};

exports['module-name'] = 'InternalModels';

exports['module-type'] = 'factory';

exports['module-dependencies'] = [
  'InternalUsersModel',
  'InternalRolesModel',
  'InternalRolePermissionsModel',
  'InternalPermissionsModel',
  'InternalModulesModel',
  'TeamModel',
  'UserModel',
  'TeamUserModel',
];
