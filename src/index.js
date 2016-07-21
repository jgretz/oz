import express from 'express';
import objectAssign from 'object-assign';
import configure from './server/configure';
import applyRoutes from './server/routing';

const defaultConfig = {
  src: './src',

  port: 3000,

  spa: {
    path: '/release',
    index: 'index.html',
  },

  dms: {
    admin: {
      url: '/admin'
    }
  }
};

export default (options) => {
  const config = objectAssign(defaultConfig, options || {});

  // create and configure the app
  const app = express();

  configure(app, config);
  applyRoutes(app, config);

  app.listen(process.env.PORT || config.port);
};
