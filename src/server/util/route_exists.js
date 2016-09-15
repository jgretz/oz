import _ from 'lodash';

export default (router, req) => {
  return _.filter(router.stack, r => req.url.match(r.regexp));
};
