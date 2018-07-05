const Sequelize = require('sequelize');

const bcrypt = require('bcrypt');

const uuid = require('uuid');

const moment = require('moment');

const mixin = require('merge-descriptors');

const {
  Op,
} = Sequelize;

const hasOwn = {}.hasOwnProperty;

exports = module.exports = function InternalUsers(connection) {
  const InternalUsersModel = connection.define('internal_users', {
    userId: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      field: 'user_id',
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(300),
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING(300),
      field: 'first_name',
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING(300),
      field: 'last_name',
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING(300),
    },
    roleId: {
      allowNull: false,
      type: Sequelize.BIGINT,
      field: 'role_id',
    },
    resetPasswordToken: {
      type: Sequelize.UUID,
      field: 'reset_password_token',
    },
    resetPasswordExpires: {
      type: Sequelize.DATE,
      field: 'reset_password_expires',
    },
    emailValidationToken: {
      type: Sequelize.UUID,
      field: 'email_validation_token',
    },
  }, {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    instanceMethods: {
      authenticate: function(password){
        console.log(password);
        return bcrypt.compare(password, this.password)
      },
      resetPassword(){
        return this.updateAttributes({
          resetPasswordToken: uuid(),
          resetPasswordExpires: new moment().format("YYYY-MM-DD HH:mm:ss Z").add(1, 'days'),
        });
      },
    },
    classMethods: {
      generateSearchQuery(params){
        const options = {
          whereOptions: {
            firstName(val){
              return {
                firstName: {
                  [Op.iLike]: `%${val}%`,
                },
              };
            },
            lastName(val){
              return {
                lastName: {
                  [Op.iLike]: `%${val}%`,
                },
              };
            },
            email(val) {
              return {
                email: {
                  [Op.iLike]: `%${val}%`
                },
              };
            },
            roleId(){

            },
            updatedAtMin(val){

            },
            updatedAtMax(val){

            },
          },
          otherParameter: {

          },
        };
      },
    },
  });

  mixin(InternalUsersModel.prototype, {
    authenticate: function(password){
      return bcrypt.compareSync(password, this.password)
    },
  });

  InternalUsersModel.beforeCreate(function(user) {
    user.password = bcrypt.hashSync(user.password, 10);
  });

  return InternalUsersModel.schema('rlinternal');
};

exports['module-name'] = 'InternalUsersModel';

exports['module-dependencies'] = [
  'connection',
];

exports['module-type'] = 'factory';
