import express from 'express';
import objectAssign from 'object-assign';
import configure from './src/config';
import applyRoutes from './src/routes';

export default (options) => {
  const config = objectAssign({
    src: './src',
    spa: {
      path: '/release',
      index: 'index.html',
    },

    port: 3000
  }, options);

  // create and configure the app
  const app = express();

  configure(app, config);
  applyRoutes(app, config);

  app.listen(process.env.PORT || config.port);
};
