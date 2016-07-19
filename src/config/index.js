import cors from './cors';
import bodyParser from './bodyparser';
import spa from './spa';

import loadFiles from '../util/load_files';

export default (app, config) => {
  const custom = loadFiles([`${config.src}/config/`]);
  _.forEach([
    cors, bodyParser, spa, manualRoutes,
    ...custom
  ], (f) => f.instance(app, config));
};
