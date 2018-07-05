const resolveModules = require('./resolve-modules');

module.exports = class Middleware {
  constructor(options){
    this.root = options.root;
    this.middlwares = {};
  }

  bindDependencies(name, deps) {
    const middleware = this.getMiddleware(name);

    middleware.resolvedMiddleware = middleware.middlware.bind.apply(null, deps);
    middleware.isResolved = true;
  }

  getMiddleware(name){
    return this.middewares[name];
  }

  getMiddlewareArray(middlewares){
    return middlewares.map(middleware => {
      return this.get(middleware);
    });
  }

  getMiddlewares() {
    return Object.keys(this.middlwares);
  }

  load(middlwares){
    const requiredMiddlewares = resolveModules(this.root, middlwares);
    requiredMiddlewares.forEach(requiredMiddleware => {
      this.setupMiddlware(requiredMiddleware);
    });
  }

  setupMiddlware(middleware){
    this.middlwares[middleware['middleware-name']] = {
      middleware,
      name: middlware['middleware-name'],
      dependencies: middleware['middleware-dependencies'] || [],
      resolvedMiddleware: null,
      isResolved: false,
    };
  }
};
