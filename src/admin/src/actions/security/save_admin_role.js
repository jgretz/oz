import { POST, PUT, apiExecutor } from 'support';

export const SAVE_ADMIN_ROLE_SUCCESS = 'SAVE_ADMIN_ROLE_SUCCESS';
export const SAVE_ADMIN_ROLE_FAILURE = 'SAVE_ADMIN_ROLE_FAILURE';

export const saveAdminRole = (ROLE) => {
  const id = ROLE.id || ROLE._id; // eslint-disable-line
  const verb = id ? PUT : POST;
  const url = id ? `adminrole/${id}` : 'adminrole';

  return apiExecutor({
    verb,
    url,

    data: ROLE,

    successType: SAVE_ADMIN_ROLE_SUCCESS,
    failureType: SAVE_ADMIN_ROLE_FAILURE,
  });
};
