import {
  LOAD_ADMIN_USERS_SUCCESS,
  LOAD_ADMIN_USER_SUCCESS,
  SAVE_ADMIN_USER_SUCCESS,
  DELETE_ADMIN_USER_SUCCESS,
} from 'actions';
import { updateItemInArray, removeItemFromArray } from 'support';

const INITIAL_VALUE = [];

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case LOAD_ADMIN_USERS_SUCCESS:
      return action.payload.data;

    case LOAD_ADMIN_USER_SUCCESS:
    case SAVE_ADMIN_USER_SUCCESS:
      return updateItemInArray(state, action.payload.data);

    case DELETE_ADMIN_USER_SUCCESS:
      return removeItemFromArray(state, action.payload.data);

    default:
      return state;
  }
};
