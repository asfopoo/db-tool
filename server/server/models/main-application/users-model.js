const Sequelize = require('sequelize');

const bcrypt = require('bcrypt');

exports = module.exports = function User(connection) {
  const UserModel = connection.define('users', {
    userId: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      field: 'user_id',
    },
    firstName: {
      allowNull: false,
      type: Sequelize.TEXT,
      field: 'first_name',
    },
    lastName: {
      allowNull: false,
      type: Sequelize.TEXT,
      field: 'last_name',
    },
    email: {
      allowNull: false,
      type: Sequelize.TEXT,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    phone: {
      allowNull: true,
      type: Sequelize.TEXT
    },
    password: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    salt: {
     type: Sequelize.TEXT,
    },
    provider: {
      type: Sequelize.TEXT
    },
    teamData: {
      type: Sequelize.JSONB,
      defaultValue: JSON.parse('[]'),
      field: 'team_data',
    },
    additionalProvidersData: {
      type: Sequelize.JSONB,
      field: 'additional_providers_data',
    },
    resetPasswordToken: {
      type: Sequelize.TEXT,
      field: 'reset_password_token',
    },
    resetPasswordExpires: {
      type: Sequelize.DATE,
      field: 'reset_password_expires',
    },
    emailValidationToken: {
      type: Sequelize.UUID,
      field: 'email_validation_token',
    },
    oUserId: {
      allowNull: true,
      type: Sequelize.TEXT,
      field: 'o_user_id',
    },
    isSuperAdmin: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      field: 'is_super_admin',
    },
  }, {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    scopes: {
      rlAdmin: {
        where: {
          email: 'admin@returnlogic.com',
        },
      },
    },
  });

  return UserModel.schema('auth');

};

exports['module-name'] = 'UserModel';

exports['module-dependencies'] = [
  'connection',
];

exports['module-type'] = 'factory';
