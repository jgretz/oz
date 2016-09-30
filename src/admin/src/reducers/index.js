import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import schema from './schema/schema';
import schemaTypes from './schema/schema_types';

import data from './data/data';

import adminUsers from './security/admin_users';

const rootReducer = combineReducers({
  form: formReducer,

  schema,
  schemaTypes,

  data,

  adminUsers,
});

export default rootReducer;
