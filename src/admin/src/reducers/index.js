import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import objects from './schema/objects';
import schemaTypes from './schema/schema_types';

const rootReducer = combineReducers({
  form: formReducer,

  objects, schemaTypes,
});

export default rootReducer;
