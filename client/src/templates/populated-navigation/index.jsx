import React, {
  Component,
} from 'react';

import {
  SideNavigation,
  SideNavigationItem,
} from './../../components';

import {
  withRouter,
} from 'react-router-dom';

import {
  connect,
} from 'react-redux';

import {
  bindActionCreators,
} from 'redux';

import {
  logout,
} from 'state/auth/actions';

class PopulatedNavigation extends Component {
  logout(e){
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <SideNavigation
        logo="https://s3.amazonaws.com/media.returnlogic.com/logo/rl_logo_new_white.png"
      >
        <SideNavigationItem href="/dashboard"><i className="fa fa-home"/>Home</SideNavigationItem>
        <SideNavigationItem href="/dashboard/customers"><i className="fa fa-user"/>Customers</SideNavigationItem>
        <SideNavigationItem href="/dashboard/users"><i className="fa fa-users"/>Users</SideNavigationItem>
        <SideNavigationItem
          href="#"
          overrideOnClick={e => this.logout(e)}
        >
          <i className="fas fa-sign-out-alt"/>Logout
        </SideNavigationItem>
      </SideNavigation>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    logout,
  }, dispatch);
};

export default withRouter(connect(null, mapDispatchToProps)(PopulatedNavigation))
