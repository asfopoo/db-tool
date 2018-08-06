import {
  combineReducers,
} from 'redux';

import {
  reducer as formReducer,
} from 'redux-form';

import authReducer from './auth/reducer';

/*import customersReducer from './customers/reducer';
import internalRolesReducer from './internal-roles/reducer';
import internalUsersReducer from './internal-users/reducer';*/


export const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  /*internalRoles: internalRolesReducer,
  internalUsers: internalUsersReducer,
  customers: customersReducer,*/
});

