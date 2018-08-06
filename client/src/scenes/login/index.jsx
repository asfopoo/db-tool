import React, {
  Component,
} from 'react';

import LoginForm from './login-form';

import {
  withAuthenticatedRedirect,
} from 'auth';

class LoginPage extends Component {
  static defaultProps = {
    styles: {
      image: {
        height: "65px",
        width: "auto",
      },
      loginContainer: {
        padding: "20px",
        backgroundColor: "#FFFFFF",
        marginTop: "50px",
      },
    }
  };

  onSubmitSuccess = _ => {
    console.log("CALLED");
    this.props.history.push('/dashboard');
  };

  render(){
    const {
      styles: {
        image,
        loginContainer,
        formInput,
      },
    } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-lg-offset-4" style={loginContainer}>
            <div className="text-center">
              <img src="https://s3.amazonaws.com/media.returnlogic.com/logo/rl_logo_new.png" style={image}/>
            </div>
            <LoginForm onSubmitSuccess={this.onSubmitSuccess}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthenticatedRedirect(LoginPage, '/dashboard');



