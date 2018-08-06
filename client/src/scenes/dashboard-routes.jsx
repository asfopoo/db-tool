import React, {
  Component,
} from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import {
  withAuthentication,
} from 'auth';

import DashboardPage from './dashboard';


import {
  XPanel,
} from 'components';

import PopulatedNavigation from 'templates/populated-navigation';

class DashboardRoutes extends Component {
  render(){
    return (
      <div>
        <PopulatedNavigation />
        <XPanel>
          <Switch>
            <Route exact path="/dashboard" component={DashboardPage}/>
          </Switch>
        </XPanel>
      </div>
    );
  }
}

export default withAuthentication(DashboardRoutes);