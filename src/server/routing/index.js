import express from 'express';
import { manualRoutes, adminRoutes, spaRoutes, apiRoutes, apiDynamicRoutes } from './config';

export default (app, config) => {
  var router = express.Router();

  adminRoutes(app, router, config);
  spaRoutes(app, router, config);

  apiRoutes(app, router, config);
  apiDynamicRoutes(app, router, config);

  manualRoutes(app, router, config);

  app.use(router);
};
