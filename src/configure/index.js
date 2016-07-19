import _ from 'lodash';

import cors from './cors';
import bodyParser from './bodyparser';
import spa from './spa';

import loadFiles from '../util/load_files';

export default (app, config) => {
  const custom = loadFiles([`${config.src}/config/`]).map(f => f.instance);
  _.forEach(
    [cors, bodyParser, spa, ...custom],
    (f) => f(app, config)
  );
};
