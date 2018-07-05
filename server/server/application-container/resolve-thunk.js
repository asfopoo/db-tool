module.exports = function resolveThunk(home){
  return function(relativePath) {
    return require(`${home}${relativePath}`);
  }
};
