import SchemaRoute from '../routes/schema_route';
import SchemaTypesRoute from '../routes/schema_types_route';
import AdminUserRoute from '../routes/admin_user_route';
import AdminRoleRoute from '../routes/admin_role_route';
import { DATABASE } from 'configure/database';
import { defineRoute } from 'util';

export const adminApiRoutes = (app, router, config) => {
  if (!config.admin || !config.db) {
    return;
  }

  const db = app.get(DATABASE);

  defineRoute(app, router, new SchemaRoute(db), '/api/schema');
  defineRoute(app, router, new SchemaTypesRoute(), '/api/schematypes');

  defineRoute(app, router, new AdminUserRoute(db), '/api/adminuser');
  defineRoute(app, router, new AdminRoleRoute(db), '/api/adminrole');
};
