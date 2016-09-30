import { DELETE, apiExecutor } from 'support';

export const DELETE_ADMIN_ROLE_SUCCESS = 'DELETE_ADMIN_ROLE_SUCCESS';
export const DELETE_ADMIN_ROLE_FAILURE = 'DELETE_ADMIN_ROLE_FAILURE';

export const deleteAdminRole = (id) =>
  apiExecutor({
    verb: DELETE,
    url: `adminrole/${id}`,

    successType: DELETE_ADMIN_ROLE_SUCCESS,
    failureType: DELETE_ADMIN_ROLE_FAILURE,
  });
