import SchemaRoute from '../routes/schema_route';
import SchemaTypesRoute from '../routes/schema_types_route';
import { DATABASE } from 'configure/database';
import { defineRoute } from 'util';

export const apiRoutes = (app, router, config) => {
  if (!config.admin || !config.db) {
    return;
  }

  defineRoute(app, router, new SchemaRoute(app.get(DATABASE)), '/api/schema');
  defineRoute(app, router, new SchemaTypesRoute(), '/api/schematypes');
};
