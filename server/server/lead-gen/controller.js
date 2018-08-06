const boom = require('boom');

exports = module.exports = function leadGenMasterCleanController(leadGenMasterCleanModel){
  return [
    {
      route: '/lead-gen-controller',
      method: 'GET',
      handler(req, res, next) {
        const {
          query,
        } = req;

        return leadGenMasterCleanModel.findAndCountAll().then(user => {
          return res.jsonSuccess(user);
        }).catch(err => {
          return res.boom.badImplementation("Server Error", err);
        });
      },
    },
  ];
};

exports['controller-name'] = 'leadGenMasterCleanController';

exports['controller-dependencies'] = ['leadGenMasterCleanModel'];
