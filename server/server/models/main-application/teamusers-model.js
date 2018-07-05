const Sequelize = require('sequelize');

exports = module.exports = function TeamUser(connection) {
  const TeamUserModel = connection.define('teamusers', {
    teamuserId: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      field: 'teamuser_id',
    },
    teamId: {
      allowNull: false,
      type: Sequelize.UUID,
      field: 'team_id',
    },
    accountNumber: {
      allowNull: false,
      type: Sequelize.INTEGER,
      field: 'account_number',
    },
    teamName: {
      allowNull: false,
      type: Sequelize.TEXT,
      field: 'team_name',
    },
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
      field: 'user_id',
    },
    roles: {
      allowNull: false,
      type: Sequelize.JSONB,
      defaultValue: JSON.parse('[]')
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  });

  return TeamUserModel.schema('auth');
};

exports['module-name'] = 'TeamUserModel';

exports['module-dependencies'] = [
  'connection',
];

exports['module-type'] = 'factory';
