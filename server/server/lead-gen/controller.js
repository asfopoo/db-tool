const boom = require('boom');


exports = module.exports = function leadGenMasterCleanController(leadGenMasterCleanModel){
  return [
   /* {
      route: '/lead-gen-controller',  // gets ALL entries in the lead gen master clean table
      method: 'GET',
      handler(req, res, next) {
        const {
          query,
        } = req;
        return leadGenMasterCleanModel.findAndCountAll({limit:50}).then(user => {
          return res.jsonSuccess(user);
        }).catch(err => {
          console.log(err);
          return res.boom.badImplementation("Server Error", err);
        });
      },
    },*/
    {
      route: '/lead-gen-controller/:id',  // gets entry from lead gen master defined by id
      method: 'GET',
      handler(req, res, next){
        const {
          id,
        } = req.params;


        return leadGenMasterCleanModel.findById(id).then(user => {
          if(user === null){
            return res.boom.notFound('No User Found');
          }
          console.log(user);
          return res.jsonSuccess(user);
        }).catch(err => {
          console.log(err);
          return res.boom.badImplementation("Server Error", err);
        });
      },
    },
  ];
};

exports['controller-name'] = 'leadGenMasterCleanController';

exports['controller-dependencies'] = ['leadGenMasterCleanModel'];
