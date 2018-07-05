const boom = require('boom');

exports = module.exports = function InternalRolesController(InternalRolesModel) {
  return [
    {
      route: '/internal-roles',
      method: 'GET',
      handler(req, res, next){
        return InternalRolesModel.findAndCountAll().then(roles => {
          return res.jsonSuccess(roles);
        }).catch(err => {
          return res.boom.badImplementation("Server Error", err);
        });
      },
    },
  ];
};

exports['controller-name'] = 'InternalRolesController';

exports['controller-dependencies'] = ['InternalRolesModel'];

