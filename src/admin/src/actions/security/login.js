import { POST, apiExecutor } from 'support';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (username, password) =>
  apiExecutor({
    verb: POST,
    url: 'login',

    data: { username, password },

    successType: LOGIN_SUCCESS,
    failureType: LOGIN_FAILURE,
  });
