import _ from 'lodash';

export default (router, req) => {
  return _.some(router.stack, r => req.url.match(r.regexp));
};
