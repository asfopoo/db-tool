const resolveModules = require('./resolve-modules');

const dependencyCache = require('./dependency-cache');

const hasOwn = {}.hasOwnProperty;

const containerTypesMap = {
  factory(container, deps){
    container.resolvedModule = container.mod.apply(null, deps);
    container.isResolved = true;
    return container;
  },
  singleton(container, deps){
    container.resolvedModule = container.mod;
    container.isResolved = true;
    return container;
  },
  service(container, deps){
    container.resolvedModule = new (Function.prototype.bind.apply(container.mod, [container.mod, ...deps]))();
    container.isResolved = true;
    return container;
  },
};

const containerTypes = Object.keys(containerTypesMap);

module.exports = class Dependencies {
  constructor(options){
    this.containers = {};
    this.isBootrapped = false;
    this.root = options.root;
  }

  bootstrap() {
    const cache = new dependencyCache();

    Object.keys(this.containers).forEach(container => {
      const current = this.getContainer(container);

      if (!current.isResolved) {
        this.resolveDependencies(current, cache);
      }
    });

    this.isBootrapped = true;
  }

  get(name){
    const container = this.getContainer(name);

    if(!this.hasContainer(name)){
      throw new Error(`Module ${name} Does Not Exist`);
    }

    if(!container.isResolved){
      throw new Error(`Module ${name} Must Be Resolved Before It Can Be Loaded`);
    }

    return container.resolvedModule;
  }

  getDependenciesArray(depsArr) {
    return depsArr.map(dep => {
      return this.get(dep);
    });
  }

  getContainer(name) {
    if(!this.hasContainer(name)){
      throw new Error(`Module ${name} Does Not Exist`);
    }

    return this.containers[name];
  }

  hasContainer(name){
    return hasOwn.call(this.containers, name);
  }

  load(dependencies){
    const requiredModules = resolveModules(this.root, dependencies);
    requiredModules.forEach(mod => {
      this.setupContainer(mod);
    });
  }

  resolveDependencies(container, cache){
    const resolvedDependencies = container.dependencies.map(dependency => {
      if (cache.hasCycle(container, dependency)) {
        throw new Error("CIRCULAR DEPENDENCIES");
      }

      cache.set(container, dependency);

      const currentDependency = this.getContainer(dependency);

      if (currentDependency.isResolved) {
        return currentDependency
      } else {
          return this.resolveDependencies(currentDependency, cache);
      }
    });

    const resolvedModules = resolvedDependencies.map(resolvedDependency => {
      return resolvedDependency.resolvedModule;
    });

    return Dependencies.resolveContainer(container, resolvedModules);
  }

  setupContainer(mod){
    Dependencies.validate(mod);
    this.containers[mod['module-name']] = {
      mod,
      dependencies: mod['module-dependencies'] || [],
      type: mod['module-type'],
      resolvedModule: null,
      isResolved: false,
    };
  }

  static validate(mod){
    if(!hasOwn.call(mod, 'module-name')){
      throw new Error("Module Must Have Name");
    }

    if(!hasOwn.call(mod, 'module-type')){
      throw new Error("Module Must Have A Type");
    }
  }

  static resolveContainer(container, deps){
    return containerTypesMap[container['type']](container, deps)
  }
};
