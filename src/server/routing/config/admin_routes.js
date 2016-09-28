import path from 'path';
import { ADMIN_URL, mapSpa } from 'util';

export const adminRoutes = (app, router, config) => {
  if (!config.admin) {
    return;
  }

  mapSpa(ADMIN_URL, path.join(__dirname, '../../admin/'), router);
};
