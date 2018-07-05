module.exports = {
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
