const convict = require('convict');

const config = convict({
  env: {
    doc: 'The Application Environment',
    format: [
      'development',
      'demo',
      'local',
      'production',
    ],
    default: 'local',
    env: 'NODE_ENV',
  },
  db: {
    dbUrl: {
      doc: 'The Database URL',
      format: String,
      default: 'postgresql://admin:p455w0rd@localhost:5432/returnlogic',
      env: 'POSTGRES_URL',
    },
    schema: {
      doc: 'The Default Database Schema For Sequelize',
      default: 'rlap',
      format: String,
      env: 'SCHEMA',
    },
  },
  jwt: {
    key: {
      doc: 'The Key For The JSON Webtoken',
      format: String,
      default: 'user',
      env: 'jwtKey',
    },
    secret: {
      doc: 'The Secret For The JSON Webtoken',
      format: String,
      default: 'acacbacbabcabcbacbabca',
      env: 'jwtSecret',
    },
  },
});

exports = module.exports = config;

exports['module-name'] = 'config';

exports['module-dependencies'] = [];

exports['module-type'] = 'singleton';
