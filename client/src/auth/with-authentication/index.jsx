import React, {
  Component,
} from  'react';

import {
  connect,
} from 'react-redux';

export const withAuthentication = WrappedComponent => {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/');
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

  return connect(mapStateToProps)(Authenticate);
};
