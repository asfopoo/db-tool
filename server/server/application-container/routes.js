const Route = require('./route');
module.exports = class Routes {
  constructor(){
    this.routes = [];
  }

  addRoutes(routes){
    routes.forEach(route => {
      this.routes.push(new Route(route));
    })
  }

  getRoutes(){
    return this.routes;
  }
};
