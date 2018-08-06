import {
  call,
  takeLatest,
  put,
  all,
} from 'redux-saga/effects';

import {
  SubmissionError,
} from 'redux-form';

import {
  login,
} from 'services/api';

import {
  authenticateUser,
} from './actions';

import AuthService from 'services/auth-service';

export function *authenticateUserSaga({
                                        payload,
                                      }){
  console.log(payload);
  try {
    const {
      data,
    } = yield call(login, payload);
    console.log(data);
    AuthService.setToken(data.token);
    const user = AuthService.decodeJwt(data.token);
    yield put(authenticateUser.success(user));

  } catch(err) {
    yield put(authenticateUser.failure(err.response));
  }
}

export function *watchAuthenticateUser(){
  yield takeLatest(authenticateUser.REQUEST, authenticateUserSaga);
}

export default function *rootSaga(){
  yield all([
    watchAuthenticateUser(),
  ]);
}
