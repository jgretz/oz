import {
  LOAD_ADMIN_ROLES_SUCCESS,
  SAVE_ADMIN_ROLE_SUCCESS,
  DELETE_ADMIN_ROLE_SUCCESS,
} from 'actions';
import { updateItemInArray, removeItemFromArray } from 'support';

const INITIAL_VALUE = [];

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case LOAD_ADMIN_ROLES_SUCCESS:
      return action.payload.data;

    case SAVE_ADMIN_ROLE_SUCCESS:
      return updateItemInArray(state, action.payload.data);

    case DELETE_ADMIN_ROLE_SUCCESS:
      return removeItemFromArray(state, action.payload.data);

    default:
      return state;
  }
};
