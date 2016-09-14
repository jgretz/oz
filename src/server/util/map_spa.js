import _ from 'lodash';
import urljoin from 'url-join';
import path from 'path';

export default (rootUrl, filePrefix, router) => {
  // maps to the files for the app
  const map = {
    '/bundle.js': 'bundle.js',
    '/bundle.js.map': 'bundle.js.map',
    '/styles.css': 'styles.css',
    '/styles.css.map': 'styles.css.map',
    '': 'index.html',
    '/*': 'index.html',
  };

  _.forOwn(map, (file, url) => {
    router['get'](urljoin('*', rootUrl, url), (req, res) => {
      res.status(200).sendFile(path.join(filePrefix, file));
    });
  });
};
