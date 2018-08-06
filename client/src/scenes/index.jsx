import React, {
  Component,
} from 'react';

import {
  Switch,
  Route,
} from 'react-router-dom';

import {
  withLoadUser,
} from 'auth';


import DashboardRoutes from './dashboard-routes';

import LoginForm from './login';


class Routes extends Component {
  render(){
    return (
      <Switch>
        <Route exact path='/' component={LoginForm} />
        <Route path="/dashboard" component={DashboardRoutes}/>
      </Switch>
    );
  }
}

// Wrap Like This To Check If User Is Authenticated
//export default withLoadUser(Routes);

export default withLoadUser(Routes);
