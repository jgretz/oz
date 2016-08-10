import path from 'path';
import routeExists from '../util/route_exists';

export default (app, router, config) => {
  if (!config.spa) {
    return;
  }

  router['get']('*', (req, res, next) => {
    // if the route exists, just let it go there
    if (routeExists(router, req)) {
      next();
      return;
    }

    res.status(200).sendFile(path.join(config.spa.path, config.spa.index));
  });
};
