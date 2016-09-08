import express from 'express';
import objectAssign from 'object-assign';
import configure from './server/configure';
import applyRoutes from './server/routing';

const defaultConfig = {
  port: 3000,
  admin: true
};

export default (options) => {
  const config = objectAssign(defaultConfig, options || {});

  // create and configure the app
  const app = express();

  configure(app, config);
  applyRoutes(app, config);

  app.listen(process.env.PORT || config.port);
};

// all props
// {
//   src: __dirname,
//   port: 3000,
//   admin: true,
//   spa: {
//     path: '/release',
//     index: 'index.html'
//   },
//   db: {
//     type: 'mongo',
//     connection: ''
//   }
//   uploads: {
//    type: 'file',
//    route: '/files',
//    path: '/files'
//   }
//
// };
