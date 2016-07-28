import express from 'express';
import manualRoutes from './manual_routes';
import adminRoutes from './admin_routes';
import spaRoutes from './spa_routes';
import apiRoutes from './api_routes';
import apiDynamicRoutes from './api_dynamic_routes';

export default (app, config) => {
  var router = express.Router();

  adminRoutes(app, router, config);
  spaRoutes(app, router, config);

  apiRoutes(app, router, config);
  apiDynamicRoutes(app, router, config);
  manualRoutes(app, router, config);

  app.use(router);
};
