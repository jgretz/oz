import _ from 'lodash';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { adminUrl } from 'support';

import App from './app';

import Home from './misc/home';
import NotFound from './misc/not_found';

import EditSchema from './schema/edit_schema';
import DataList from './data/list';
import DataDetail from './data/detail';

// TODO: fix this hack
let root = adminUrl('');
if (root.length > 1) {
  root = _.trim(root, '/');
}

export default () =>
(
  <Router history={browserHistory}>
    <Route path={root} component={App}>
      <IndexRoute component={Home} />

      <Route path="schema" component={EditSchema} />
      <Route path="schema/:id" component={EditSchema} />

      <Route path="data/:id" component={DataList} />
      <Route path="data/:object/:id" component={DataDetail} />

      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);