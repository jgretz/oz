import { browserHistory } from 'react-router';
import join from 'join-path-js';
import constants from 'constants';

export const rootUrl = (relativeUrl) => join(constants.ROOT_URL, relativeUrl);
export const apiUrl = (relativeUrl) => join(constants.API_URL, relativeUrl);
export const adminUrl = (relativeUrl) => join(constants.ADMIN_URL, relativeUrl);

export const goto = (relativeUrl) => {
  browserHistory.push(adminUrl((relativeUrl)));
};
