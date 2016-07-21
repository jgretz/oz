import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';

const routes = (store) => {
  return (
    <Route path="/" component={App} />
  );
};

export default routes;
