import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import objects from './schema/objects';

const rootReducer = combineReducers({
  form: formReducer,

  objects,
});

export default rootReducer;
