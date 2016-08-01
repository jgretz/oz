import _ from 'lodash';
import {
  LOAD_SCHEMA_SUCCESS,
  SAVE_SCHEMA_SUCCESS,
  DELETE_SCHEMA_SUCCESS,
} from 'actions' ;

const INITIAL_VALUE = [];

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case LOAD_SCHEMA_SUCCESS:
      return action.payload.data;

    case SAVE_SCHEMA_SUCCESS: {
      const obj = action.payload.data;
      const index = _.findIndex(state, o => o._id === obj._id);

      const array = _.clone(state);
      if (index >= 0) {
        array.splice(index, 1, obj);
      } else {
        array.push(obj);
      }

      return array;
    }

    case DELETE_SCHEMA_SUCCESS: {
      const obj = action.payload.data;
      const index = _.findIndex(state, o => o._id === obj._id);

      const array = _.clone(state);
      _.pullAt(array, index);

      return array;
    }

    default:
      return state;
  }
};
