import React from 'react';
import { Route } from 'react-router';

import App from './components/app';
import EditSchema from './components/schema/edit_schema';

const routes = () =>
  <Route path="/" component={App}>
    <Route path="/editschema" component={EditSchema} />
  </Route>;

export default routes;
