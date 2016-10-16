import _ from 'lodash';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { adminUrl, isLoggedIn } from 'support';

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
import Login from './security/login';

// set root
let root = adminUrl('');
if (root.length > 1) {
  root = _.trim(root, '/');
}

// auth
const requireAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

// routes
export default () =>
(
  <Router history={browserHistory}>
    <Route path={root} component={App}>
      <IndexRoute component={Home} onEnter={requireAuth} />

      <Route path="login" component={Login} />

      <Route path="schema" component={EditSchema} onEnter={requireAuth} />
      <Route path="schema/:id" component={EditSchema} onEnter={requireAuth} />

      <Route path="data/:id" component={DataList} onEnter={requireAuth} />
      <Route path="data/:object/:id" component={DataDetail} onEnter={requireAuth} />

      <Route path="adminusers" component={AdminUserList} onEnter={requireAuth} />
      <Route path="adminusers/:id" component={AdminUserDetail} onEnter={requireAuth} />
      <Route path="adminroles" component={AdminRoleList} onEnter={requireAuth} />
      <Route path="adminroles/:id" component={AdminRoleDetail} onEnter={requireAuth} />

      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
