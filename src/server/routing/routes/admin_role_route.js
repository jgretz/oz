import ObjectRoute from './object_route';
import AdminRole from 'models/admin_role';

export default class AdminRoleRoute extends ObjectRoute {
  constructor(db) {
    super(AdminRole, db);
  }
}
