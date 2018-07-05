import React from 'react';

import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import configureStore from './store';

import {
  Provider,
} from 'react-redux';

import {
  BrowserRouter,
} from 'react-router-dom';

import Routes from './scenes';

import './_index.scss';

import {
  rootSaga,
} from 'state';

const store = configureStore();

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
