import _ from 'lodash';
import { LOAD_OBJECTS_SUCCESS } from 'actions';

const INITIAL_VALUE = {};

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case LOAD_OBJECTS_SUCCESS: {
      const prop = _.last(action.payload.config.url.split('/'));
      const newState = { ...state };
      newState[prop] = action.payload.data;

      return newState;
    }

    default:
      return state;
  }
};
