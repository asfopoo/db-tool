import {
  actionsWatcherSaga,
} from 'redux-saga-actions';

import {
  fork,
  takeEvery,
  all,
} from 'redux-saga/effects';

export function *rootSaga(){
  yield all([]);
}
