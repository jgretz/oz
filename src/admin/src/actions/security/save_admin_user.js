import { POST, PUT, apiExecutor } from 'support';

export const SAVE_ADMIN_USER_SUCCESS = 'SAVE_ADMIN_USER_SUCCESS';
export const SAVE_ADMIN_USER_FAILURE = 'SAVE_ADMIN_USER_FAILURE';

export const saveAdminUser = (user) => {
  const id = user.id || user._id; // eslint-disable-line
  const verb = id ? PUT : POST;
  const url = id ? `adminuser/${id}` : 'adminuser';

  return apiExecutor({
    verb,
    url,

    data: user,

    successType: SAVE_ADMIN_USER_SUCCESS,
    failureType: SAVE_ADMIN_USER_FAILURE,
  });
};
