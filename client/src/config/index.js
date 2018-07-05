const config = {
  env: process.env.NODE_ENV,
};

const envConfig = require(`./environment/${config.env}`);

Object.assign(config, envConfig);

export default {
  get(path){
    const keys = path.split('.');

    return keys.reduce((ref, key) => {
      return ref[key];
    }, config);
  },
};
