module.exports = class Route {
  constructor(route){
    this.route = {
      method: route.method.toLowerCase(),
      handler: route.handler,
      before: route.before || [],
      after: route.after || [],
      options: route.options || {},
      route: route.route,
    };

    this.loadedMiddleware = {
      before: [],
      after: [],
    };

    this.definition = {
      method: this.route.method,
      signature: [],
    };
  }

  hasBeforeMiddleware(){
    return this.route.before.length > 0;
  }

  getBeforeMiddleware(){
    return this.route.before;
  }

  setBeforeMiddleware(middlewares){
    const middlewaresWithContext = deps.map(middlewareWithContext => {
      return middlewareWithContext(this.route.options);
    });

    Array.prototype.push.apply(this.loadedMiddleware.before, middlewaresWithContext);
  }

  hasAfterMiddleware() {
    return this.route.after.length > 1;
  }

  getAfterMiddleware(){
    return this.route.before;
  }

  setAfterMiddleware(middlewares){
    const middlewaresWithContext = deps.map(middlewareWithContext => {
      return middlewareWithContext(this.route.options);
    });

    Array.prototype.push.apply(this.loadedMiddleware.after, middlewaresWithContext);
  }

  getDefinition(){
    this.setDefinition();
    return this.definition;
  }

  setDefinition(){
    this.definition.signature.push(this.route.route);
    Array.prototype.push.apply(this.definition.signature, this.loadedMiddleware.left);
    this.definition.signature.push(this.route.handler);
    Array.prototype.push.apply(this.definition.signature, this.loadedMiddleware.right);
  }
};
