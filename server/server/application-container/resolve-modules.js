const resolveThunk = require('./resolve-thunk');
module.exports = function resolveModules(root, files){
  const resolver = resolveThunk(root);

  return files.map(resolver);
};
