import { GET, apiExecutor } from 'support';

export const LOAD_ADMIN_ROLES_SUCCESS = 'LOAD_ADMIN_ROLES_SUCCESS';
export const LOAD_ADMIN_ROLES_FAILURE = 'LOAD_ADMIN_ROLES_FAILURE';
export const LOAD_ADMIN_ROLE_SUCCESS = 'LOAD_ADMIN_ROLE_SUCCESS';
export const LOAD_ADMIN_ROLE_FAILURE = 'LOAD_ADMIN_ROLE_FAILURE';

export const loadAdminRoles = () =>
  apiExecutor({
    verb: GET,
    url: 'adminrole',

    successType: LOAD_ADMIN_ROLES_SUCCESS,
    failureType: LOAD_ADMIN_ROLES_FAILURE,
  });

export const loadAdminRole = (id) =>
  apiExecutor({
    verb: GET,
    url: `adminrole/${id}`,

    successType: LOAD_ADMIN_ROLE_SUCCESS,
    failureType: LOAD_ADMIN_ROLE_FAILURE,
  });
