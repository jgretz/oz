import express from 'express';
import { manualRoutes, adminRoutes, adminApiRoutes, spaRoutes, apiDynamicRoutes } from './config';

export default (app, config) => {
  var router = express.Router();

  adminRoutes(app, router, config);
  spaRoutes(app, router, config);

  adminApiRoutes(app, router, config);
  apiDynamicRoutes(app, router, config);

  manualRoutes(app, router, config);

  app.use(router);
};
