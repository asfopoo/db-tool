import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import {
  rootReducer,
} from 'state';

import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  store.runSaga = sagaMiddleware.run;
  return store;
}
