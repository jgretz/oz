import _ from 'lodash';
import {
  LOAD_OBJECTS_SUCCESS,
  SAVE_OBJECT_SUCCESS,
  DELETE_OBJECT_SUCCESS,
} from 'actions' ;

const INITIAL_VALUE = [];

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case LOAD_OBJECTS_SUCCESS:
      return action.payload.data;

    case SAVE_OBJECT_SUCCESS: {
      const obj = action.payload.data;
      const index = _.findIndex(state, o => o._id === obj._id); // eslint-disable-line

      const array = _.clone(state);
      if (index >= 0) {
        array.splice(index, obj);
      } else {
        array.push(obj);
      }

      return array;
    }

    case DELETE_OBJECT_SUCCESS: {
      const obj = action.payload.data;
      const index = _.findIndex(state, o => o._id === obj._id); // eslint-disable-line

      const array = _.clone(state);
      _.pullAt(array, index);

      return array;
    }

    default:
      return state;
  }
};
