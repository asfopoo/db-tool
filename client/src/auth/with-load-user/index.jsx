import React, {
  Component,
} from 'react';

import {
  connect,
} from 'react-redux';

import {
  withRouter,
}  from 'react-router-dom';

import AuthService from 'services/auth-service';

import {
  bindActionCreators,
} from "redux";

import {
  authenticateUser,
} from 'state/auth/actions';

export const withLoadUser = WrappedComponent => {
  class LoadUser extends Component {
    loadUser(){
      const user = AuthService.decodeToken();

      this.props.authenticate(user)
      console.log("USER LOADED");
    }

    componentWillMount() {
      if (!this.props.isAuthenticated && AuthService.isAuthenticated()) {
        this.loadUser();
      }
    }

    render(){
      return (
        <WrappedComponent {...this.props}/>
      );
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.auth.isAuthenticated };
  }

  const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      authenticate: authenticateUser.success,
    }, dispatch);
  };

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadUser));
};
