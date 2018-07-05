const hasOwn = {}.hasOwnProperty;

exports = module.exports = class TeamService {
  constructor(
    TeamModel,
    TeamUserModel,
    UserModel
  ){
    this.models = {
      TeamModel,
      TeamUserModel,
      UserModel,
    }
  }

  create(values) {

  }

  update(values) {

  }

};

exports['module-name'] = 'TeamService';

exports['module-type'] = 'service';

exports['module-dependencies'] = [
  'TeamModel',
  'TeamUserModel',
  'UserModel'
];
