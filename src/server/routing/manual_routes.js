import _ from 'lodash';
import join from 'join-path-js';

import loadFiles from '../util/load_files';
import defineRoute from './util/define_route';

export default (app, router, config) => {
  const searchPath = join(config.src, '/routes');
  const routes = loadFiles(searchPath);

  _.forEach(routes, (routeInfo) => {
    // set path name for the route
    let path = routeInfo.relativePath.replace('.js', '');
    if (path.includes('index')) {
      path = path.replace('index', '');
    }

    // attach the routes as defined
    defineRoute(router, routeInfo.instance, path);
  });
};
