import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import {
  rootReducer,
} from 'state';

import createSagaMiddleware from 'redux-saga';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('state', () => {
      const nextReducer = require('state');
      store.replaceReducer(nextReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;

  return store;
}
