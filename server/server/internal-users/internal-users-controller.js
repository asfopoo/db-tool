const boom = require('boom');

exports = module.exports = function InternalUserController(InternalUsersModel){
  return [
    {
      route: '/internal-users',
      method: 'GET',
      handler(req, res, next) {
        const {
          query,
        } = req;

        return InternalUsersModel.findAndCountAll().then(user => {
          return res.jsonSuccess(user);
        }).catch(err => {
          return res.boom.badImplementation("Server Error", err);
        });
      },
    },
    {
      route: '/internal-users/:id',
      method: 'GET',
      handler(req, res, next){
        const {
          id,
        } = req;

        return InternalUsersModel.findById(id).then(user => {
          if(user === null){
            return res.boom.notFound('No User Found');
          }

          return res.jsonSuccess(user);
        }).catch(err => {
          return res.boom.badImplementation("Server Error", err);
        });
      },
    },
    {
      route: '/internal-users/:id',
      method: 'PUT',
      handler(req, res, next){
        const {
          id,
        } = req;

        return InternalUsersModel.findById(id).then(user => {
          if(user === null){
            return res.boom.notFound('No User Found');
          }

          return res.jsonSuccess(user);
        }).catch(err => {
          return res.boom.badImplementation("Server Error", err);
        });
      },
    },
    {
      route: '/internal-users/:id',
      method: 'DELETE',
      handler(req, res, next){
        const {
          id,
        } = req;

        return InternalUsersModel.findById(id).then(user => {
          if(user === null){
            return res.boom.notFound('No User Found');
          }

          return user.destroy().then( _ => {
            return res.status(204).send();
          });
        }).catch(err => {
          return res.boom.badImplementation("Server Error", err);
        });
      },
    },
    {
      route: '/internal-users',
      method: 'POST',
      handler(req, res, next){
        const {
          body:{
            email,
            password,
            firstName,
            lastName,
            roleId,
          }
        } = req;

        const User = InternalUsersModel.build({
          email,
          password,
          firstName,
          lastName,
          roleId,
        });

        User.save().then(user => {
          return res.jsonSuccess(user);
        }).catch(err => {
          return res.status(500).send(err);
        });
      },
    },
  ];
};

exports['controller-name'] = 'InternalUsersController';

exports['controller-dependencies'] = ['InternalUsersModel'];
