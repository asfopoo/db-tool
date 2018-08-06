const _ = require('lodash');

function arrayToSnakeCase(arr){
  return arr.map(element => {
    return Object.keys(element).reduce((prev, key) => {
      console.log(prev);
      console.log(key);
      prev[_.snakeCase(key)] = element[key];
      return prev;
    }, {});
  });
}

exports = module.exports = function TeamController(connection, TeamModel, UserModel, TeamUserModel, RoleModel) {
  return [
    {
      route: '/teams',
      method: 'GET',
      handler(req, res, next) {
        const {
          query,
        } = req;

        return TeamModel.findAndCountAll().then(team => {
          return res.jsonSuccess(team);
        }).catch(err => {
          return res.boom.badImplementation("Server Error", err);
        });
      },
    },
    {
      route: '/teams',
      method: 'POST',
      handler(req, res, next) {
        const {
          body,
        } = req;

        return connection.transaction(t => {
          return TeamModel.create(body, {
            transaction: t,
          }).then(team => {
            const adminUser = UserModel.scope('rlAdmin').findOne({
              transaction: t,
            });

            return Promise.all([team, adminUser]);
          }).then(([team, adminUser]) => {
            return RoleModel.scope('admin').findAll({
              transaction: t,
            }).then(roles => {
              return team.addUsers(adminUser, {
                through: {
                  teamName: team.teamName,
                  accountNumber: team.accountNumber,
                  roles: arrayToSnakeCase(roles),
                },
                transaction: t,
              });
            }).then( _ => {
              return Promise.resolve(team);
            });
          });
        }).then(team => {
          return Promise.resolve(team);
        }).then(team => {
          return res.jsonSuccess(team);
        }).catch(err => {
          console.log(err);
          return res.boom.badImplementation("Server Error", err);
        });
      },
    },
    {
      route: '/teams/:teamId',
      method: 'PUT',
      handler(req, res, next){
        const {
          teamId,
        } = req.params;

        return TeamModel.findById(teamId).then(team => {
          if(team === null){

          }

          return res.jsonSuccess(team);
        }).catch(err => {
          console.log(err);
        });
      },
    },
    {
      route: '/teams/:teamId',
      method: 'DELETE',
      handler(req, res, next){

      },
    },
    {
      route: '/teams/:teamId/teamusers/:teamUserId',
      method: 'DELETE',
      handler(req, res, next){

      },
    },
  ];
};

exports['controller-name'] = 'TeamController';

exports['controller-dependencies'] = [
  'connection',
  'TeamModel',
  'UserModel',
  'TeamUserModel',
  'RoleModel',
];
