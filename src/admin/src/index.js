import React from 'react';
import {render} from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

// styles
import './styles/styles.scss';

// create the store
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes(store)} />
  </Provider>, document.getElementById('app')
);
