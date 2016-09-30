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

import AdminUserList from './security/admin_user_list';
import AdminUserDetail from './security/admin_user_detail';
import AdminRoleList from './security/admin_role_list';
import AdminRoleDetail from './security/admin_role_detail';

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

      <Route path="adminusers" component={AdminUserList} />
      <Route path="adminusers/:id" component={AdminUserDetail} />
      <Route path="adminroles" component={AdminRoleList} />
      <Route path="adminroles/:id" component={AdminRoleDetail} />

      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
