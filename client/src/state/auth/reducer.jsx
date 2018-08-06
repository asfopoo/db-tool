import {
  LOGOUT_USER,
} from './constants';

import {
  authenticateUser,
} from './actions';

const defaultState = {
  user: {},
  isAuthenticated: false,
  isAuthenticating: false,
  error: null,
};

export default function authReducer(state = defaultState, action){
  switch(action.type){
    case authenticateUser.REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      };
    case authenticateUser.SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case authenticateUser.FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        error: null,
        user: {},
      };
    default:
      return state;
  }
}
