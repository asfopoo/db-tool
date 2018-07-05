const Sequelize = require('sequelize');

const createAccountId = (teamName, accountNumber) => {
  return `${teamName.toLowerCase().split(' ').join('').slice(0, 5)}${accountNumber}`;
};

exports = module.exports = function Team(connection){
  const TeamModel = connection.define('teams', {
    teamId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      field: 'team_id',
      primaryKey: true,
    },
    accountId: {
      type: Sequelize.TEXT,
      field: 'account_id',
    },
    accountNumber: {
      type: Sequelize.INTEGER,
      field: 'account_number',
    },
    teamWebsite: {
      allowNull: true,
      type: Sequelize.TEXT,
      field: 'team_website',
    },
    teamName: {
      allowNull: false,
      type: Sequelize.TEXT,
      field: 'team_name'
    },
    teamAddress: {
      allowNull: true,
      type: Sequelize.JSONB,
      field: 'team_address',
    },
    teamContacts: {
      allowNull: true,
      type: Sequelize.JSONB,
      field: 'team_contacts',
    },
    description: {
      allowNull: true,
      type: Sequelize.TEXT
    },
    teamColor: {
      allowNull: true,
      type: Sequelize.TEXT,
      field: 'team_color',
    },
    enabled: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    setupData: {
      type: Sequelize.JSONB,
      defaultValue: null,
      field: 'setup_data',
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  });

  TeamModel.beforeCreate(function(team, options) {
    options = options || {};

    Object.assign(options, {
      type: connection.QueryTypes.SELECT,
    });

    const stmt = `SELECT nextval('auth.teams_account_id_seq')`;


    return connection.query(stmt, options).then(([{nextval: accountNumber}]) => {
      Object.assign(team, {
        accountNumber,
        accountId: createAccountId(team.teamName, accountNumber),
      });

      return Promise.resolve(team);
    }).catch(err => {
      return Promise.reject(err);
    });
  });

  return TeamModel.schema('auth');
};

exports['module-name'] = 'TeamModel';

exports['module-dependencies'] = [
  'connection',
];

exports['module-type'] = 'factory';
