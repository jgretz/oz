import { browserHistory } from 'react-router';
import constants from 'constants';

export const rootUrl = (relativeUrl) => `${constants.ROOT_URL}/${relativeUrl}`;
export const apiUrl = (relativeUrl) => `${constants.API_URL}/${relativeUrl}`;
export const adminUrl = (relativeUrl) => `${constants.ADMIN_URL}/${relativeUrl}`;

export const goto = (relativeUrl) => {
  browserHistory.push(adminUrl((relativeUrl)));
};
