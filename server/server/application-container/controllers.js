const resolveModules = require('./resolve-modules');

module.exports = class Controllers {
  constructor(options){
    this.root = options.root;
    this.controllers = {};
  }

  load(controllers){
    const requiredModules = resolveModules(this.root, controllers);
    requiredModules.forEach(mod => {
      this.setupController(mod);
    });
  }

  setupController(mod){
    this.controllers[mod['controller-name']] = {
      controller: mod,
      name: mod['controller-name'],
      dependencies: mod['controller-dependencies'] || [],
      resolvedController: null,
      isResolved: false,
    };
  }

  getControllers(){
    return Object.keys(this.controllers);
  }

  getController(name){
    return this.controllers[name];
  }

  resolveController(name, deps){
    const controller = this.getController(name);
    controller.resolvedController = controller.controller.apply(null, deps);
    controller.isResolved = true;
  }
};
