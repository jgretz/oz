import ObjectRoute from './object_route';
import AdminUser from 'models/admin_user';

export default class AdminUserRoute extends ObjectRoute {
  constructor(db) {
    super(AdminUser, db);
  }
}
