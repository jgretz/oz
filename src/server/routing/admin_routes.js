import _ from 'lodash';
import path from 'path';

import { ADMIN_URL } from '../util/constants';

export default (app, router, config) => {
  if (!config.admin) {
    return;
  }

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
    router['get'](`*/${ADMIN_URL}${url}`, (req, res) => {
      res.status(200).sendFile(path.join(__dirname, `../../admin/${file}`));
    });
  });
};
