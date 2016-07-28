import defineRoute from './define_route';
import SchemaRoute from '../api/schema_route';
import SchemaTypesRoute from '../api/schema_types_route';
import { DATABASE } from '../configure/database';

export default (app, router, config) => {
  if (!config.admin || !config.db) {
    return;
  }

  defineRoute(router, new SchemaRoute(app.get(DATABASE)), '/api/schema');
  defineRoute(router, new SchemaTypesRoute(), '/api/schematypes');
};
