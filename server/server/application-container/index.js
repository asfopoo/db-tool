const express = require('express');

const Dependencies = require('./dependencies');

const Middleware = require('./middleware');

const Controllers = require('./controllers');

const Routes = require('./routes');

const resolveModules = require('./resolve-modules');

module.exports = class ApplicationContainer {
  constructor(options){
    this.server = express();

    this.root = options.root;

    this.dependencies = new Dependencies({
      root: options.root,
    });

    this.middleware = new Middleware({
      root: options.root,
    });

    this.controllers = new Controllers({
      root: options.root,
    });

    this.routes = new Routes();
  }

  _addServerRoute({ method, signature }){
    this.server[method].apply(this.server, signature);
  }

  bootstrap() {
    this.dependencies.bootstrap();

    this.middleware.getMiddlewares().forEach(middlewareName => {
      const middleware = this.middleware.getMiddleware(middlewareName);
      const middlewareDeps = middleware.dependencies;
      const resolvedDeps = this.dependencies.getDependenciesArray(middlewareDeps);
      this.middleware.bindDependencies(middlewareName, resolvedDeps);
    });

    this.controllers.getControllers().forEach(controllerName => {
      const controller = this.controllers.getController(controllerName);
      const controllerDeps = controller.dependencies;
      const resolvedDeps = this.dependencies.getDependenciesArray(controllerDeps);
      this.controllers.resolveController(controllerName, resolvedDeps);
      this.routes.addRoutes(controller.resolvedController);
    });

    this.routes.getRoutes().forEach(route => {
      if(route.hasBeforeMiddleware()){
        const beforeMiddleware = route.getBeforeMiddleware();
        const resolvedMiddleware = this.middleware.getMiddlewareArray(beforeMiddleware);
        route.setBeforeMiddleware(resolvedMiddleware);
      }

      if(route.hasAfterMiddleware()){
        const afterMiddleware = route.getAfterMiddleware();
        const resolvedMiddleware = this.middleware.getMiddlewareArray(afterMiddleware);
        route.setAfterMiddleware(resolvedMiddleware);
      }

      this._addServerRoute(route.getDefinition());
    });

    return this;
  }

  configureServer(configureFunction){
    configureFunction.call(this);
  }

  loadServerConfigurations(configurations){
    const resolvedConfigurations = resolveModules(this.root, configurations);

    resolvedConfigurations.forEach(resolvedConfiguration => {
      this.configureServer(resolvedConfiguration);
    });
  }
};
