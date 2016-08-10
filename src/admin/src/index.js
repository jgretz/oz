import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

import Router from './components/router';
import { logError } from 'support';

// styles
import './styles/styles.scss';

// create the store
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

try {
  render(
    <Provider store={store}>
      <Router store={store} />
    </Provider>, document.getElementById('app')
  );
} catch (err) {
  logError(err);
}
