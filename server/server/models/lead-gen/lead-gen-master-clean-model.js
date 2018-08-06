const Sequelize = require('sequelize');

exports = module.exports = function leadGenMasterClean(connection){
  const leadGenMasterCleanModel = connection.define('rl_leads', {
    rowid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'rowid',
    },
    url_prefix: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'url_prefix',
    },
    url_domain: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'url_domain',
    },
    company_url: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'company_url',
    },
    location_on_site: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'location_on_site',
    },
    company: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'company',
    },
    vertical: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'vertical',
    },
    quantcast: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'quantcast',
    },
    alexa: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'alexa',
    },
    telephones: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'telephones',
    },
    emails: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'emails',
    },
    twitter: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'twitter',
    },
    facebook: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'facebook',
    },
    linkedin: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'linkedin',
    },
    google: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'google',
    },
    pinterest: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'pinterest',
    },
    github: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'github',
    },
    instagram: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'instagram',
    },
    vk: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'vk',
    },
    vimeo: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'vimeo',
    },
    youtube: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'youtube',
    },
    people: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'people',
    },
    city: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'city',
    },
    state_abbrev: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'state_abbrev',
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
    first_detected: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'first_detected',
    },
    last_found: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'last_found',
    },
    first_indexed: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'first_indexed',
    },
    last_indexed: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'last_indexed',
    },
    temp_row_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'temp_row_id',
    },
    has_returnly: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      field: 'has_returnly',
    },
    is_primary: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      field: 'is_primary',
    },
    is_deadlink: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      field: 'is_deadlink',
    },
    us_rank: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'us_rank',
    },
    us_organic_keywords: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'us_organic_keywords',
    },
    us_organic_traffic: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'us_organic_traffic',
    },
    us_organic_cost: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'us_organic_cost',
    },
    us_adwords_keywords: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'us_adwords_keywords',
    },
    us_adwords_traffic: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'us_adwords_traffic',
    },
    us_adwords_cost: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'us_adwords_cost',
    },
    us_pla_keywords: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'us_pla_keywords',
    },
    us_pla_uniques: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'us_pla_uniques',
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });

  return leadGenMasterCleanModel.schema('public');
};

exports['module-name'] = 'leadGenMasterCleanModel';

exports['module-dependencies'] = [
  'leadgenConnection',
];

exports['module-type'] = 'factory';
