import _ from 'lodash';

export const routeExists = (router, req) => {
  return _.filter(router.stack, r => req.url.match(r.regexp));
};
