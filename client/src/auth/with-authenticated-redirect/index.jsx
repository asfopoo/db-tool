import React, {
  Component,
} from  'react';

import {
  connect,
} from 'react-redux';

export const withAuthenticatedRedirect = (WrappedComponent, route) => {
  class AuthenticatedRedirect extends Component {
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.props.history.push(route);
      }
    }

    render(){
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.auth.isAuthenticated };
  }

  return connect(mapStateToProps)(AuthenticatedRedirect);
};
