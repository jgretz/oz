import _ from 'lodash';

import cors from './cors';
import bodyParser from './bodyparser';

import loadFiles from '../util/load_files';

export default (app, config) => {
  const custom = loadFiles([`${config.src}/config/`]).map(f => f.instance);
  _.forEach(
    [cors, bodyParser, ...custom],
    (f) => f(app, config)
  );
};
