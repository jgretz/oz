import _ from 'lodash';
import join from 'join-path-js';

import cors from './cors';
import bodyParser from './bodyparser';
import database from './database';
import uploads from './uploads';

import loadFiles from '../util/load_files';

export default (app, config) => {
  const path = join(config.src, '/config');
  const custom = loadFiles(path).map(f => f.instance);

  _.forEach(
    [cors, bodyParser, database, uploads, ...custom],
    (f) => f(app, config)
  );
};
