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
  '/resources/recurly',
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
]);

app.middleware.load([

]);

app.controllers.load([
  '/auth/internal-auth-controller',
  '/internal-users/internal-users-controller',
  '/internal-roles/internal-roles-controller',
  '/team/team-controller',
]);

app.bootstrap();


app.server.listen(8091, () => {
  console.log("SERVER RUNNING");
});
