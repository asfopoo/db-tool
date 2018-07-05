const passport = require('passport');

exports = module.exports = function InternalAuthController(AuthService){
  console.log(AuthService);
  return [
    {
      method: 'POST',
      route: '/auth',
      handler(req, res, next){
        return passport.authenticate('local', (err, user, info) => {
          console.log(err);
          if(err){
            //return res.sendBoom(err);
            return res.status(404).send("Error WITH YO SHHIT");
          }
          delete user.password;
          return res.jsonSuccess({
            token: AuthService.signToken(user, 'user'),
          });
        })(req, res, next);
      },
    },
  ];
};

exports['controller-name'] = 'InternalAuthController';

exports['controller-dependencies'] = [
  'AuthService',
];
