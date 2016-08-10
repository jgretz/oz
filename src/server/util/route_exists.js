import _ from 'lodash';

export default (router, req) => {
  // if the route exists, just let it go there
  const routes = _.uniq(
    router.stack.map((layer) => {
      return layer.route.path;
    })
  );

  return routes.includes(req.url);
};
