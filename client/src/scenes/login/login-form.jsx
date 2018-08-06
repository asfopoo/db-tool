import React from 'react';

import {
  reduxForm,
  Field,
} from 'redux-form';

import {
  RLTextInput,
  RLLabel,
  RLButton,
} from 'components';

import {
  authenticateUser,
} from 'state/auth/actions';

const createOldStyles = {
    marginTop: "40px"
};

const FieldAdapter = ({
                        input,
                        ...rest,
                      }) => {
  const params = {
    ...input,
    ...rest,
  };
  return (
    <RLTextInput autoComplete="off" {...params} />
  );
};

const LoginForm = props => {
  const {
    handleSubmit,
  } = props;

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-lg-offset-4">
            <form onSubmit={handleSubmit(authenticateUser)}>
              <div className="form-group" style={createOldStyles}>
                <RLLabel htmlFor="email">Email</RLLabel>
                <Field
                  name="email"
                  id="email"
                  size="md"
                  component={FieldAdapter}
                  type="email"
                />
              </div>
              <div className="form-group" style={createOldStyles}>
                <RLLabel htmlFor="password">Password</RLLabel>
                <Field
                  name="password"
                  id="password"
                  size="md"
                  component={FieldAdapter}
                  type="password"
                />
              </div>
              <div className="form-group" style={createOldStyles}>
                <RLButton type="submit" size="full">Submit</RLButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};


export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
})(LoginForm);


