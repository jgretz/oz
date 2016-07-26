import defineRoute from './define_route';
import SchemaRoute from '../api/schema_route';

export default (app, router, config) => {
  if (!config.admin || !config.db) {
    return;
  }

  defineRoute(router,  new SchemaRoute(config.db), '/api/schema');
};
