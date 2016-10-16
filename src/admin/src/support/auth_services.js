
/* eslint-disable */

export const isLoggedIn = () => {
  return localStorage.token != null;
};

export const hasAccessToRoute = (route) => {
  return false;
};
