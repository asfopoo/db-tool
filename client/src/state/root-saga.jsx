import AuthSaga from './auth/saga';

/*import CustomersSaga from './customers/saga';

import InternalUsersSaga from './internal-users/saga';

import InternalRolesSaga from './internal-roles/saga';*/

import {
  actionsWatcherSaga,
} from 'redux-saga-actions';

import {
  fork,
  takeEvery,
  all,
} from 'redux-saga/effects';

export function *rootSaga(){
  yield all([
    //fork(InternalUsersSaga),
    //fork(InternalRolesSaga),
    fork(actionsWatcherSaga),
    //fork(CustomersSaga),
    fork(AuthSaga),
  ]);
}