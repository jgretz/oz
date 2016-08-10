import _ from 'lodash';
import path from 'path';

import { API_URL, ADMIN_URL } from '../util/constants';

export default (app, router, config) => {
  if (!config.spa) {
    return;
  }

  router['get']('*', (req, res, next) => {
    var ignore = [ADMIN_URL, API_URL];
    if (_.some(ignore, i => req.url.startsWith(i))) {
      next();
      return;
    }

    res.status(200).sendFile(path.join(config.spa.path, config.spa.index));
  });
};
