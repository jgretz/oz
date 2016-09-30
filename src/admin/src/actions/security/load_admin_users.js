import { GET, apiExecutor } from 'support';

export const LOAD_ADMIN_USERS_SUCCESS = 'LOAD_ADMIN_USERS_SUCCESS';
export const LOAD_ADMIN_USERS_FAILURE = 'LOAD_ADMIN_USERS_FAILURE';

export const loadAdminUsers = () =>
  apiExecutor({
    verb: GET,
    url: 'adminuser',

    successType: LOAD_ADMIN_USERS_SUCCESS,
    failureType: LOAD_ADMIN_USERS_FAILURE,
  });
