const Sequelize = require('sequelize');

exports = module.exports = function leadGenElist(connection){
  const leadGenElistModel = connection.define('elist', {
    rowid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'rowid',
      autoIncrement: true,
    },
    domain: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'domain',
    },
    companyName: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'companyname',
    },
    vertical: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'vertical',
     },
     companyphone: {
       type: Sequelize.TEXT,
       allowNull: true,
       field: 'companyphone',
     },
    companytwitter: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'companytwitter',
    },
    companyfacebook: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'companyfacebook',
    },
    companylinkedin: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'companylinkedin',
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'address',
    },
    address2: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'address2',
    },
    city: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'city',
    },
    state: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'state',
    },
    zip: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'zip',
    },
    country: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'country',
    },
    ecommerceplatform: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'ecommerceplatform',
    },
    visualreview: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'visualreview',
    },
    returnsolution: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'returnsolution',
    },
    typeofproduct: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'typeofproduct',
    },
    visualreviewnotes: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'visualreviewnotes',
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });

  return leadGenElistModel.schema('public');
};

exports['module-name'] = 'leadGenElistModel';

exports['module-dependencies'] = [
  'leadgenConnection',
];

exports['module-type'] = 'factory';
