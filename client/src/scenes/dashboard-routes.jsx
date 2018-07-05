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

class DashboardRoutes extends Component {
  render(){
  }
}

export default withAuthentication(DashboardRoutes);
