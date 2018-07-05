const passport = require('passport');

const {
  Strategy: LocalStrategy,
} = require('passport-local');

const Boom = require('boom');

exports = module.exports = function PassportLocal(InternalUsersModel){
  return passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', // this is the virtual field on the model
  }, function(email, password, done){
    console.log(email);
    console.log(password);
    return InternalUsersModel.findOne({
      where: {
        email,
      },
    }).then(user => {
      if(!user){
        return done(Boom.notFound('Email Not Found'));
      }
      console.log(user.authenticate(password));
      if(!user.authenticate(password)){
        return done(Boom.unauthorized('Password Mismatch'));
      }

      return done(null, user.get());
    }).catch(err => {
      return done(err);
    });
  }));

};

exports['module-name'] = 'PassportLocal';

exports['module-dependencies'] = [
  'InternalUsersModel',
];

exports['module-type'] = 'factory';
