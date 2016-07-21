import _ from 'lodash';
import loadFiles from '../util/load_files';

export default (app, router, config) => {
  const verbs = ['get','post','put','delete'];
  const routes = loadFiles([`${config.src}/routes`]);

  _.forEach(routes, (routeInfo) => {
    // set path name for the route
    let path = routeInfo.relativePath.replace('.js', '');
    if (path.includes('index')) {
      path = path.replace('index', '');
    }

    // attach the routes as defined
    const route = routeInfo.instance;
    const before = route['before'];
    const after = route['after'];

    _.forEach(verbs, (verb) => {
      if (!route[verb]) {
        return;
      }

      router[verb](path, (req, res) => {
        if (before) {
          before(req, res, verb);
        }

        route[verb](req, res);

        if (after) {
          after(req, res, verb);
        }
      });
    });
  });
};
