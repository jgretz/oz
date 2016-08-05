import constants from 'constants';

export const rootUrl = (relativeUrl) => `${constants.ROOT_URL}/${relativeUrl}`;
export const apiUrl = (relativeUrl) => `${constants.API_URL}/${relativeUrl}`;
