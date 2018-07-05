const jwt = require('jsonwebtoken');

const expressJwt = require('express-jwt');

const compose = require('composable-middleware');

exports = module.exports = function AuthService(config){
  const validateJwt = expressJwt({
    secret: config.get('jwt.secret'),
    requestProperty: 'payload',
  });

  return {
    isAuthenticated(){

    },
    signToken(user){
      return jwt.sign({
        user,
      },
      config.get('jwt.secret'), {
        expiresIn: 3600000,
        issuer: config.get('jwt.key'),
      });
    },
  };
};

exports['module-name'] = 'AuthService';

exports['module-type'] = 'factory';

exports['module-dependencies'] = [
  'config',
];
