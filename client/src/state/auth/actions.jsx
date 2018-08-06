import {
  createAction,
} from 'redux-saga-actions';

import {
  LOGOUT_USER,
} from './constants';

import AuthService from 'services/auth-service';

export function logout(){
  AuthService.removeToken();


  return {
    type: LOGOUT_USER,

  }
}

export const authenticateUser = createAction('AUTHENTICATE_USER');
