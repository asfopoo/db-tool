Object.defineProperty(Error.prototype, 'toJSON', {
  value: function () {
    var alt = {};

    Object.getOwnPropertyNames(this).forEach(function (key) {
      alt[key] = this[key];
    }, this);

    return alt;
  },
  configurable: true,
  writable: true
});

const ApplicationContainer = require('./application-container');

const app = new ApplicationContainer({
  root: __dirname,
});

app.loadServerConfigurations([
  '/configure-server',
]);

app.dependencies.load([
  '/config',
  '/resources/passport-local',
  '/resources/database-connection',
  '/models',
  '/models/internal-application/internal-roles-model',
  '/models/internal-application/internal-users-model',
  '/models/internal-application/internal-role-permissions-model',
  '/models/internal-application/internal-permissions-model',
  '/models/internal-application/internal-modules-model',
  '/models/main-application/teams-model',
  '/models/main-application/teamusers-model',
  '/models/main-application/users-model',
  '/models/main-application/roles-model',
  '/auth/auth-service',
  '/team/team-service',
  '/resources/lead-gen-connection',
  '/models/lead-gen/lead-gen-master-clean-model',
  '/models/lead-gen/lead-gen-Elist-model'
]);

app.middleware.load([

]);

app.controllers.load([
  '/auth/internal-auth-controller',
  '/internal-users/internal-users-controller',
  '/internal-roles/internal-roles-controller',
  '/team/team-controller',
  '/lead-gen/controller.js',
  '/uploader/uploader-controller',
  //'/insertion/uploader-controller',
  '/downloader/downloader-controller',

]);

app.bootstrap();


app.server.listen(8091, () => {
  console.log("SERVER RUNNING");
});
