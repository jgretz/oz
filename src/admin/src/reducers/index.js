import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import schema from './schema/schema';
import schemaTypes from './schema/schema_types';

import data from './data/data';

import adminUsers from './security/admin_users';
import adminRoles from './security/admin_roles';

const rootReducer = combineReducers({
  form: formReducer,

  schema,
  schemaTypes,

  data,

  adminUsers,
  adminRoles,
});

export default rootReducer;
