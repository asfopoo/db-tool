module.exports = {
  apps : [{
    name   : "app1",
    script : "./app.js"
  }],
  deploy : {
    production : {
      user : "user",
      host : ["10.10.1.208"],
      ref : "origin/master",
      repo : "git@bitbucket.org:asfopoo/leaden-app.git",
      path : "/home/user/prod-server",
      "post-deploy" : "npm install"
    },
  }
}
