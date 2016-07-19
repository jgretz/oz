import manualRoutes from './manual_routes';

export default (app, config) => {
  var router = express.Router();

  manualRoutes(app, router, config);

  app.use(router);
};
