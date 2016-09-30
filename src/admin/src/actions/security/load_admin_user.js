import { GET, apiExecutor } from 'support';

export const LOAD_ADMIN_USER_SUCCESS = 'LOAD_ADMIN_USER_SUCCESS';
export const LOAD_ADMIN_USER_FAILURE = 'LOAD_ADMIN_USER_FAILURE';

export const loadAdminUser = (id) =>
  apiExecutor({
    verb: GET,
    url: `adminuser/${id}`,

    successType: LOAD_ADMIN_USER_SUCCESS,
    failureType: LOAD_ADMIN_USER_FAILURE,
  });
