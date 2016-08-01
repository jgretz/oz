import React from 'react';
import { Route } from 'react-router';

import App from './components/app';
import EditSchema from './components/schema/edit_schema';
import DataList from './components/data/list';
import DataDetail from './components/data/detail';

const routes = () =>
  <Route path="/" component={App}>
    <Route path="/schema" component={EditSchema} />
    <Route path="/schema/:id" component={EditSchema} />

    <Route path="/data/:id" component={DataList} />
    <Route path="/data/:object/:id" component={DataDetail} />
  </Route>;

export default routes;
