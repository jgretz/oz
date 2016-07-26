import { LOAD_SCHEMA_TYPES_SUCCESS } from 'actions' ;

const INITIAL_VALUE = {};

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case LOAD_SCHEMA_TYPES_SUCCESS:
      return action.payload.data;

    default:
      return state;
  }
};
