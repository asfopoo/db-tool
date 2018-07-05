import React, {
  Component,
} from 'react';

export const withAuthorization = (WrappedComponent, roles) => {
  class Authorization extends Component {

    render(){
      return (
        <WrappedComponent {...this.props}/>
      )
    }
  }

  return Authorization;
};
