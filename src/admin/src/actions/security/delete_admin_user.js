import { DELETE, apiExecutor } from 'support';

export const DELETE_ADMIN_USER_SUCCESS = 'DELETE_ADMIN_USER_SUCCESS';
export const DELETE_ADMIN_USER_FAILURE = 'DELETE_ADMIN_USER_FAILURE';

export const deleteAdminUser = (id) =>
  apiExecutor({
    verb: DELETE,
    url: `adminuser/${id}`,

    successType: DELETE_ADMIN_USER_SUCCESS,
    failureType: DELETE_ADMIN_USER_FAILURE,
  });
