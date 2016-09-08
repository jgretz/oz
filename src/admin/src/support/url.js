import { browserHistory } from 'react-router';
import urljoin from 'url-join';
import constants from 'constants';

export const rootUrl = (relativeUrl) => urljoin(constants.ROOT_URL, relativeUrl);
export const apiUrl = (relativeUrl) => urljoin(constants.API_URL, relativeUrl);
export const adminUrl = (relativeUrl) => urljoin(constants.ADMIN_URL, relativeUrl);

export const goto = (relativeUrl) => {
  browserHistory.push(adminUrl((relativeUrl)));
};
