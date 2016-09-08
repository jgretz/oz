import _ from 'lodash';
import path from 'path';

import loadFiles from '../util/load_files';
import defineRoute from './util/define_route';

export default (app, router, config) => {
  const searchPath = path.join(config.src, '/routes');
  const routes = loadFiles(searchPath);

  _.forEach(routes, (routeInfo) => {
    // set path name for the route
    let relPath = routeInfo.relativePath.replace('.js', '');
    if (relPath.includes('index')) {
      relPath = relPath.replace('index', '');
    }

    // attach the routes as defined
    defineRoute(router, routeInfo.instance, relPath);
  });
};
