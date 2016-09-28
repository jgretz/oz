import _ from 'lodash';
import urljoin from 'url-join';
import path from 'path';
import { routeExists } from './route_exists';

// maps and filters
const map = {
  'bundle.js': 'bundle.js',
  'bundle.js.map': 'bundle.js.map',
  'styles.css': 'styles.css',
  'styles.css.map': 'styles.css.map',
  '': 'index.html',
  '*': 'index.html',
};

const files = [
  'bundle.js',
  'bundle.js.map',
  'styles.css',
  'styles.css.map'
];

const wildcards = ['', '/', '*', '/*', '*/', '*/*', '**'];

// helpers
const matchesNonSpaRoute = (rootUrl, router, req) => {
  if (_.some(files, (f) => req.url.includes(f))) {
    return false;
  }

  const matchedRoutes = routeExists(router, req);
  const noWildcards = _.filter(matchedRoutes, ({ route }) => {
    const term = route.path.replace(rootUrl, '');
    return _.every(wildcards, w => w !== term);
  });

  return noWildcards.length > 0;
};

// export
export const mapSpa = (rootUrl, filePrefix, router) => {
  _.forOwn(map, (file, url) => {
    const routeUrl = urljoin('*', rootUrl, url);
    router['get'](routeUrl, (req, res, next) => {
      if (matchesNonSpaRoute(rootUrl, router, req)) {
        next();
        return;
      }

      res.status(200).sendFile(path.join(filePrefix, file));
    });
  });
};
